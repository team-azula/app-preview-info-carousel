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
)

var LoaderIoString = os.Getenv("LOADER_IO_ID")

func StartServer() {
	fmt.Printf("Go server started on port 8000 \n")
	router := mux.NewRouter()
	router.HandleFunc("/carousels/{id}", CarouselHandler)
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
