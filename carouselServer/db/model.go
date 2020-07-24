package db

type PreviewData struct {
	Images         []string `json:"images"`
	AppDescription string   `json:"app_description"`
	AdditionalText string   `json:"additional_text"`
}

func FindOne(id string) (result []Apps, err error) {
	carouselInfo, err := GetOneById(id)
	if err != nil {
		return
	}
	result = []Apps{carouselInfo}
	return
}
