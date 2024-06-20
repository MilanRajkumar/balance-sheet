package main

import (
	doc "api-server/api-docs"
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

	openapi := doc.InitialilizeOpenAPI()

	openapi.AddOperation("balance-sheet", "GET", "/balance-sheet", "Get balance sheet", "Get balance sheet", 200, []string{doc.BalanceSheet}, nil, new(routes.ReportsType))
	r.Path("/openapi.json").Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		apiDocs, err := openapi.JSON()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		w.Write(apiDocs)
	})

	// create this client so that we can mock Client using HTTPMockClient
	// otherwise test will always call external api.
	// Calling external api is not an issue if our test environment is set up
	// in such a way that we have different test environment setup with database and with other needed.
	client := http.Client{}
	routes.GetBalanceSheet(&client).AddRoute(r)

	err := http.ListenAndServe(":4000", r)
	log.Fatal(err)
}
