import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";

class CoursePlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        number: "",
        title: "",
        prerequisites: "",
        units: "",
        completed: false,
        grade: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => {
          this.refreshList();
        });
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => {
        this.refreshList();
      });
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { number: "", title: "", prerequisites: "", Units: "", completed: false, grade: "",};

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Taken
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Not Taken
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.title}
        >
          {item.number + ": " + item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Modify
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h2 className="text-primary text-center my-4">SFU Course Planner</h2>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                  size="sm"
                >
                  Add Course
                </button>
                &nbsp;
                &nbsp;
                <button
                  className="btn btn-light"
                  onClick={this.calculateGPA}
                  size="sm"
                >
                  Refresh GPA
                </button>
                &nbsp;
                &nbsp;
                <input
                  type="text"
                  id="textbox"
                  value="GPA:"
                  readOnly
                  size="14"
                  fontSize="14px"
                  height="20px"
                >
                </input>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }

  // // The commented-out code were initially written as a placeholder
  // // for when the GPA calculation feature wasn't implemented in C.
  // // It can be a fallback option for when the Python-C connection doesn't work.

  // convertGrade = (letterGrade) => {
  //   let f = 0;
  //   switch (letterGrade) {
  //     case "A+": 
  //       f = 4.33;
  //       break;
  //     case "A":
  //       f = 4.0;
  //       break;
  //     case "A-":
  //       f = 3.67;
  //       break;
  //     case "B+":
  //       f = 3.33;
  //       break;
  //     case "B":
  //       f = 3.0;
  //       break;
  //     case "B-":
  //       f = 2.67;
  //       break;
  //     case "C+":
  //       f = 2.33;
  //       break;
  //     case "C":
  //       f = 2.0;
  //       break;
  //     case "C-":
  //       f = 1.67;
  //       break;
  //     case "D":
  //       f = 1.0;
  //       break;
  //     default: 
  //       f = 0;
  //   }
  //   return f;
  // }

  calculateGPA = () => {
    // let sumGrades = 0;
    // let sumUnits = 0;
    // axios
    //   .head("/api/todos")
    //   .then(res => {
    //     console.log(res.headers);
    //   })
    //   .catch((err) => console.log(err));
    
    axios
      .get("/api/todos/calc/")
      .then(res => {
        let gpa = res.data;
        // for (let i = 0; i < res.length; i++) {
        //   sumGrades += this.convertGrade(res[i].grade) * res[i].units;
        //   sumUnits += res[i].units;
        // }
        // let gpa = sumGrades / sumUnits;
        document.getElementById("textbox").value = "GPA: " + gpa.toFixed(2);
      });
  }
}

export default CoursePlanner;