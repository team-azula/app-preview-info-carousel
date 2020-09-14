package db

import (
	"fmt"
	"os"

	"github.com/go-pg/pg"
)

var dbUser = os.Getenv("PGUSER")
var dbPass = os.Getenv("PGPASS")
var dbHost = os.Getenv("PGHOST")
var db *pg.DB

func init() {
	if dbUser == "" {
		dbUser = "sdc-backend"
	}
	if dbPass == "" {
		dbPass = ""
	}
	if dbHost == "" {
		dbHost = "dev-postgres"
	}

	db = pg.Connect(&pg.Options{
		Addr:     fmt.Sprintf("%s:5432", dbHost),
		User:     dbUser,
		Password: dbPass,
		Database: "sdc-backend",
	})
}

// Apps - represents and app and its previewdata
type Apps struct {
	// tableName   struct{}    `pg:"apps"`
	AppId       string      `pg:"app_id,alias:app_id" json:"app_id"`
	PreviewData PreviewData `pg:"preview_data" json:"preview_data"`
}

func GetOneById(id string) (result Apps, err error) {
	app := &Apps{AppId: id}
	// log.Printf("app in GetOneById: %#v\n", app)
	err = db.Model(app).
		Where("app_id = ?", id).
		Limit(1).
		Select()
	if err != nil {
		return
	}
	result = *app
	return
	// SELECT "book"."id", "book"."title", "book"."text"
	// FROM "books" WHERE id = 1
}
