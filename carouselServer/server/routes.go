package server

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func StartServer() {
	fmt.Printf("StartServer \n")
	r := mux.NewRouter()
	r.HandleFunc("/{id}", HomeHandler)
	http.Handle("/", r)
	srv := &http.Server{
		Handler: r,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

// res is a variable name with type http.ResponseWriter, req is a variable with pointer(*) to http.Request
func HomeHandler(res http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	res.WriteHeader(http.StatusOK)
	fmt.Fprintf(res, "id: %v\n", vars["id"])
}
