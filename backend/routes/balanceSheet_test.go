package routes

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gorilla/mux"
)

type MockClient struct {
	DoFunc func(req *http.Request) (*http.Response, error)
}

func (m *MockClient) Do(req *http.Request) (*http.Response, error) {
	return m.DoFunc(req)
}

func Test_GetBalanceSheet(t *testing.T) {
	type args struct {
		req *http.Request
	}

	tests := []struct {
		name     string
		args     func(t *testing.T) args
		wantCode int
		wantBody string
	}{
		{
			name: "must return correct result",
			args: func(*testing.T) args {

				req := httptest.NewRequest("GET", "/reports/balance-sheet", nil)

				q := req.URL.Query()
				q.Add("periods", "3")
				req.URL.RawQuery = q.Encode()

				return args{
					req: req,
				}
			},
			wantCode: http.StatusOK,
			wantBody: "{Reports:[{ReportTitles:['Balance sheet','AU company','2024']}]}",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)
			resp := httptest.NewRecorder()
			r := mux.NewRouter()

			// mock client created here
			client := &MockClient{}
			client.DoFunc = func(req *http.Request) (*http.Response, error) {
				return &http.Response{
					Body:       io.NopCloser(strings.NewReader(tt.wantBody)),
					StatusCode: tt.wantCode,
				}, nil
			}

			GetBalanceSheet(client).AddRoute(r)
			r.ServeHTTP(resp, tArgs.req)

			if resp.Code != tt.wantCode {
				t.Fatalf("Expected status code: %d, but got: %d", tt.wantCode, resp.Code)
			}

			body := strings.TrimSpace(resp.Body.String())

			if body != tt.wantBody {
				t.Fatalf("Expected body to be: '%s', but got: '%s'", tt.wantBody, body)
			}
		})
	}
}
