package doc

import (
	"log"

	"github.com/swaggest/openapi-go"
	"github.com/swaggest/openapi-go/openapi3"
)

type FailureResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success" example:"false"`
}

const (
	BalanceSheet = "BalanceSheet"
)

type BadRequestResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success" example:"false"`
}

type OpenAPI3 struct {
	reflector          *openapi3.Reflector
	badRequestResponse *BadRequestResponse
	failureResponse    *FailureResponse
}

func InitialilizeOpenAPI() *OpenAPI3 {
	reflector := openapi3.Reflector{}
	reflector.Spec = &openapi3.Spec{Openapi: "3.0.3"}
	reflector.Spec.Info.
		WithTitle("Milan API").
		WithVersion("v1").
		WithDescription("Milan openapi description").
		WithContact(openapi3.Contact{}).Contact.WithName("Milan").
		WithEmail("rkmilansingh@gmail.com")

	return &OpenAPI3{
		reflector: &reflector,
		badRequestResponse: &BadRequestResponse{
			Success: false,
		},
		failureResponse: &FailureResponse{
			Success: false,
		},
	}
}

func (o *OpenAPI3) JSON() ([]byte, error) {
	return o.reflector.Spec.MarshalJSON()
}

func (o *OpenAPI3) AddOperation(
	id string,
	method string,
	path string,
	summary string,
	description string,
	statusCode int,
	tags []string,
	request interface{},
	response interface{},
) {
	context, err := o.reflector.NewOperationContext(method, path)
	if err != nil {
		log.Printf("Docs create context %s %s %s", method, path, err.Error())
	}

	context.SetTags(tags...)
	context.SetDescription(description)
	context.SetSummary(summary)
	context.SetID(id)
	context.AddReqStructure(request)
	context.AddRespStructure(response, openapi.WithHTTPStatus(statusCode))

	err = o.reflector.AddOperation(context)
	if err != nil {
		log.Printf("Docs add operation %s %s %s", method, path, err.Error())
	}
	return
}
