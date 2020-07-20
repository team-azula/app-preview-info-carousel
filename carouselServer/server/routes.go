package server

import (
	"carouselServer/db"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func StartServer() {
	fmt.Printf("StartServer \n")
	router := mux.NewRouter()
	router.HandleFunc("/carousels/{id}", CarouselHandler)
	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/dist")))
	http.Handle("/", router)
	srv := &http.Server{
		Handler: router,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func JSONResponse(w http.ResponseWriter, code int, output interface{}) {
	// Convert our interface to JSON
	response, _ := json.Marshal(output)
	// Set the content type to json for browsers
	w.Header().Set("Content-Type", "application/json")
	// Our response code
	w.WriteHeader(code)
	w.Write(response)
}

// res is a variable name with type http.ResponseWriter, req is a variable with pointer(*) to http.Request
func CarouselHandler(res http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id := vars["id"]
	records, err := db.FindOne(id)
	// log.Printf("find one result = %v\n", err)
	if err != nil {
		JSONResponse(res, 500, "fuckyou")
		return
	}
	JSONResponse(res, 200, records)
}
