package db

import (
	"github.com/go-pg/pg"
)

var db = pg.Connect(&pg.Options{
	Addr:     ":5432",
	User:     "sdc-backend",
	Password: "gimmie",
	Database: "sdc-backend",
})

type Apps struct {
	// tableName   struct{}    `pg:"apps"`
	AppId       string      `pg:"app_id,alias:app_id"`
	PreviewData PreviewData `pg:"preview_data"`
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
