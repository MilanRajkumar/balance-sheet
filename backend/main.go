package main

import (
	"api-server/routes"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func accessControlMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		h.ServeHTTP(w, r)
	})
}

func main() {
	r := mux.NewRouter()
	r.Use(accessControlMiddleware)

	// create this client so that we can mock Client using HTTPMockClient
	// otherwise out test will always call external api.
	// Calling external api is not an issue if our test environment is set up
	// in such a way that we have different test setup
	client := http.Client{}
	routes.GetBalanceSheet(&client).AddRoute(r)

	err := http.ListenAndServe(":4000", r)
	log.Fatal(err)
}
