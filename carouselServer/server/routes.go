package server

import (
	"carouselServer/db"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/newrelic/go-agent/v3/newrelic"
)

var LoaderIoString = os.Getenv("LOADER_IO_ID")
var NewRelicKey = os.Getenv("NR_KEY")

func StartServer() {
	var newRelicErr error
	var app *newrelic.Application
	if NewRelicKey != "" {
		app, newRelicErr = newrelic.NewApplication(
			newrelic.ConfigAppName("go-carousel-server"),
			newrelic.ConfigLicense(NewRelicKey),
		)
		if newRelicErr != nil {
			fmt.Printf("FAILED to enable NewRelic: %s", newRelicErr)
		} else {
			fmt.Printf("Enabled NewRelic tracking")
		}
	}
	fmt.Printf("Go server started on port 8000 \n")
	router := mux.NewRouter()

	carouselHandler := CarouselHandler
	carouselPath := "/carousels/{id}"
	if newRelicErr == nil {
		carouselPath, carouselHandler = newrelic.WrapHandleFunc(app, carouselPath, CarouselHandler)
	}

	router.HandleFunc(carouselPath, carouselHandler)
	fmt.Printf("loader io string: %s \n", LoaderIoString)
	if LoaderIoString != "" {
		router.HandleFunc(fmt.Sprintf("/%s/", LoaderIoString), LoaderHandler)
		router.HandleFunc("/loaderStatus", LoaderStatusHandler)
	}
	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/dist")))
	http.Handle("/", router)
	srv := &http.Server{
		Handler: router,
		Addr:    "0.0.0.0:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func LoaderStatusHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Printf("LoaderStatusHandler hit \n")
	res.WriteHeader(200)
	res.Write([]byte(LoaderIoString))
}

func JSONResponse(writer http.ResponseWriter, code int, output interface{}) {
	// Convert our interface to JSON
	response, _ := json.Marshal(output)
	// Set the content type to json for browsers
	writer.Header().Set("Content-Type", "application/json")
	// Our response code
	writer.WriteHeader(code)
	writer.Write(response)
}

// res is a variable name with type http.ResponseWriter, req is a variable with pointer(*) to http.Request
func CarouselHandler(res http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id := vars["id"]
	fmt.Printf("handling /carousels/%s \n", id)
	records, err := db.FindOne(id)
	// log.Printf("find one result = %v\n", err)
	if err != nil {
		JSONResponse(res, 500, "error")
		return
	}
	JSONResponse(res, 200, records)
}

func LoaderHandler(res http.ResponseWriter, req *http.Request) {
	response := []byte("loaderio-3e5444c09b811622806843f487dc750c")
	res.WriteHeader(200)
	res.Write(response)
}
