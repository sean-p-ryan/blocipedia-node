// const request = require("request");
// const server = require("../../src/server");
// const base = "http://localhost:3000/wikis/";
// const sequelize = require("../../src/db/models/index").sequelize;
// const Wiki = require("../../src/db/models").Wiki;
// const User = require("../../src/db/models").User;

// describe("routes : wikis", () => {

//   beforeEach((done) => {
//     this.user;
//     this.wiki;

//     sequelize.sync({force: true}).then((res) => {
//       User.create({
//         username: "user",
//         email: "example123@example.com",
//         password: "password1",
//         role: "standard"
//       })
//       .then((user) => {
//         this.user = user;
//         request.get({
//           url: "http://localhost:3000/auth/fake",
//           form: {
//             userId: user.id,
//             email: user.email,
//             role: user.role
//           }
//         });

//         Wiki.create({
//           title: "Face wiki",
//           body: "A wiki about faces.",
//           userId: user.id,
//           private: false
//         })
//         .then((wiki) => {
//           this.wiki = wiki;
//           done();
//         })
//         .catch((err) => {
//           console.log(err);
//           done();
//         });

//       });

//     });

//   });

//   describe("admin or premium user performing CRUD actions for Wiki", () => {

//     beforeEach((done) => {
//       User.create({
//         username: "admin1",
//         email: "admin@example.com",
//         password: "123456",
//         role: 2
//       })
//       .then((user) => {
//         request.get({
//           url: "http://localhost:3000/auth/fake",
//           form: {
//             username: user.username,
//             role: user.role,
//             userId: user.id,
//             email: user.email
//           }
//         },
//           (err, res, body) => {
//             done();
//           }
//         );
//       });
//     });

//     describe("GET /wikis", () => {

//       it("should return a status code 200 and all wikis", (done) => {
//         request.get(base, (err, res, body) => {
//           expect(res.statusCode).toBe(200);
//           expect(err).toBeNull();
//           expect(body).toContain("Wikis");
//           expect(body).toContain("Facewiki");
//           done();
//         });
//       });

//     });

//     describe("GET /wikis/new", () => {

//       it("should render a new wiki form", (done) => {
//         request.get(`${base}new`, (err, res, body) => {
//           expect(err).toBeNull();
//           done();
//         });
//       });

//     });

//     describe("POST /wikis/create", () => {
//       const options = {
//         url: `${base}create`,
//         form: {
//           title: "Martin wiki",
//           body: "A wiki about Martin guitars.",
//           private: true
//         }
//       };

//       it("should create a new wiki and redirect", (done) => {
//         request.post(options,
//           (err, res, body) => {
//             Wiki.findOne({where: {title: "Martin wiki"}})
//             .then((wiki) => {
//               expect(wiki.title).toBe("Martin wiki");
//               expect(wiki.body).toBe("A wiki about Martin guitars.");
//               expect(wiki.private).toBe(true);
//               done();
//             })
//             .catch((err) => {
//               console.log(err);
//               done();
//             });
//           }
//         );
//       });
//     });

//     describe("GET /wikis/:id", () => {

//       it("should render a view with the selected wiki", (done) => {
//         request.get(`${base}${this.wiki.id}`, (err, res, body) => {
//           expect(err).toBeNull();
//           expect(body).toContain("Martin wiki");
//           done();
//           });
//         });

//       });

//     describe("POST /wikis/:id/destroy", () => {

//       it("should delete the wiki with the associated ID", (done) => {

//         Wiki.all()
//         .then((wikis) => {

//           const wikiCountBeforeDelete = wikis.length;

//           expect(wikiCountBeforeDelete).toBe(1);

//           request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
//             Wiki.all()
//             .then((wikis) => {
//               expect(err).toBeNull();
//               expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
//               done();
//             })
//             .catch((err) => {
//               console.log(err);
//               done();
//             })

//           });
//         });

//       });

//     });

//     describe("GET /wikis/:id/edit", () => {

//       it("should render a view with an edit wiki form", (done) => {
//         request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
//           expect(err).toBeNull();
//           expect(body).toContain("Edit Wiki");
//           done();
//         });
//       });

//     });

//     describe("POST /wikis/:id/update", () => {

//       it("should update the wiki with the given values", (done) => {
//         const options = {
//           url: `${base}${this.wiki.id}/update`,
//           form: {
//             title: "Martin wiki",
//             body: "A wiki about Martin guitars.",
//             userId: this.user.id,
//             private: true
//           }
//         };

//         request.post(options,
//           (err, res, body) => {

//             expect(err).toBeNull();
//             Wiki.findOne({
//               where: { id: this.wiki.id }
//             })
//             .then((wiki) => {
//               expect(wiki.title).toBe("Martin wiki");
//               done();
//             })
//             .catch((err) => {
//               console.log(err);
//               done();
//             });
//           });
//         });
//       });
//     });

//     describe("standard user performing CRUD actions for Wiki", () => {

//       describe("GET /wikis", () => {

//         it("should return a status code 200 and all standard wikis", (done) => {
//           request.get(base, (err, res, body) => {
//             expect(res.statusCode).toBe(200);
//             expect(err).toBeNull();
//             expect(body).toContain("Wikis");
//             expect(body).toContain("Martin wiki");
//             done();
//           });
//         });

//       });

//       describe("GET /wikis/new", () => {

//         it("should render a new wiki form", (done) => {
//           request.get(`${base}new`, (err, res, body) => {
//             expect(err).toBeNull();        
//             done();
//           });
//         });

//       });

//       describe("POST /wikis/create", () => {

//         it("should create a new wiki and redirect", (done) => {
//           const options = {
//             url: `${base}create`,
//             form: {
//               title: "Amp wiki",
//               body: "A wiki about amps.",
//               userId: this.user.id,
//               private: false
//             }
//           };

//           request.post(options,

//             (err, res, body) => {
//               Wiki.findOne({where: {title: "Amp wiki"}})
//               .then((wiki) => {
//                 expect(res.statusCode).toBe(303);
//                 expect(wiki.title).toBe("Amp wiki");
//                 expect(wiki.body).toBe("A wiki about amps.");
//                 expect(wiki.private).toBe(false);
//                 done();
//               })
//               .catch((err) => {
//                 console.log(err);
//                 done();
//               });
//             }
//           );
//         });
//       });

//       describe("GET /wikis/:id", () => {

//         it("should render a view with the selected wiki", (done) => {
//           request.get(`${base}${this.wiki.id}`, (err, res, body) => {
//             expect(err).toBeNull();
//             expect(body).toContain("Martin wiki");
//             done();
//             });
//           });

//         });

//       describe("POST /wikis/:id/destroy", () => {

//         it("should delete the wiki with the associated ID", (done) => {

//           Wiki.all()
//           .then((wikis) => {

//             const wikiCountBeforeDelete = wikis.length;

//             expect(wikiCountBeforeDelete).toBe(1);

//             request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
//               Wiki.all()
//               .then((wikis) => {
//                 expect(err).toBeNull();
//                 expect(wikis.length).toBe(wikiCountBeforeDelete);
//                 done();
//               })
//               .catch((err) => {
//                 console.log(err);
//                 done();
//               })

//             });
//           });

//         });

//       });

//       describe("GET /wikis/:id/edit", () => {

//         it("should render a view with an edit wiki form", (done) => {
//           request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
//             expect(err).toBeNull();
//             expect(body).toContain("Edit Wiki");
//             done();
//           });
//         });

//       });

//       describe("POST /wikis/:id/update", () => {

//         it("should update the wiki with the given values", (done) => {
//           const options = {
//             url: `${base}${this.wiki.id}/update`,
//             form: {
//               title: "Martin wiki",
//               body: "A wiki about Martin guitars.",
//               userId: this.user.id,
//               private: true
//             }
//           };

//           request.post(options,
//             (err, res, body) => {

//               expect(err).toBeNull();
//               Wiki.findOne({
//                 where: { id: this.wiki.id }
//               })
//               .then((wiki) => {
//                 expect(wiki.title).toBe("Martin wiki");
//                 done();
//               })
//               .catch((err) => {
//                 console.log(err);
//                 done();
//               });
//             });
//           });
//         });
//     })

// });