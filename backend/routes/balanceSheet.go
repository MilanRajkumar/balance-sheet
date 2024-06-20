package routes

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var url = "http://demyst_db:3000/api.xro/2.0/Reports/BalanceSheet"

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type RowType string

const (
	RowSectionName = RowType("Section")
	RowName        = RowType("Row")
	SummaryName    = RowType("SummaryRow")
)

type Cells struct {
	Value string `json:"Value,omitempty" required:"true"`
}

type RowDataType struct {
	RowType RowType       `json:"RowType,omitempty" required:"true"`
	Title   string        `json:"Title,omitempty" required:"true"`
	Cells   []Cells       `json:"Cells,omitempty"`
	Rows    []RowDataType `json:"Rows,omitempty"`
}

type ReportType struct {
	ReportTitles []string      `json:"ReportTitles,omitempty" required:"true"`
	Rows         []RowDataType `json:"Rows,omitempty" required:"true"`
}

type ReportsType struct {
	Reports []ReportType `json:"Reports,omitempty" required:"true"`
}

const basePath = "/reports"

func GetBalanceSheet(client HTTPClient) Handler {
	return Handler{
		Route: func(r *mux.Route) {
			r.Path(basePath + "/balance-sheet").Methods("GET")
		},
		Func: func(w http.ResponseWriter, r *http.Request) {
			params := r.URL.Query()
			periods := params.Get("periods")
			log.Println("periods", periods)

			req, err := http.NewRequest(http.MethodGet, url, nil)
			if err != nil {
				http.Error(w, "Error creating external api request", http.StatusBadRequest)
				return
			}

			res, err := client.Do((req)) // api call to demyst
			if err != nil {
				fmt.Printf("err: %s", err)
				http.Error(w, "Error calling demyst db", http.StatusInternalServerError)
				return
			}

			resBody, err := io.ReadAll(res.Body)
			defer res.Body.Close()

			if err != nil {
				http.Error(w, "Error reading demyst_db body", http.StatusInternalServerError)
				return
			}
			w.Write(resBody)
		},
	}
}
