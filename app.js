const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const port = 3000;

const app = express();

// object data
const courses = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    desc: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
  },
  {
    id: 2,
    title: "The Complete React.js Course",
    desc: "Learn React.js by building real-world applications with React, Redux, React Router, Node, Express, MongoDB, Mocha, and more!",
  },
  {
    id: 3,
    title: "The Complete Angular Course",
    desc: "Learn Angular by building real-world applications with Angular, Node, Express, MongoDB, Mocha, and more!",
  },
  {
    id: 4,
    title: "The Complete Vue.js Course",
    desc: "Learn Vue.js by building real-world applications with Vue, Vuex, Vue Router, Node, Express, MongoDB, Mocha, and more!",
  },
];

const schema = buildSchema(`
    type Course {
        id: ID,
        title : String,
        desc : String
    }
    type Query {
        course(id: ID!) : Course ,
        courses : [Course]
    }
`);

const resolver = {
  course: (args) => {
    return courses.find((value) => value.id == args.id);
  },
  courses: () => courses,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`app running at port ${port}`));
