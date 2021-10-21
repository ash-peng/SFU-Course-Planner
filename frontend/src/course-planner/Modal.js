import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import "./Modal.css";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  async fetchCourse() {
    const inputCourse = document.getElementById("todo-number").value.split(" ");
    const dept = inputCourse[0];
    const num = inputCourse[1];
    const urlMatch = "http://www.sfu.ca/bin/wcm/academic-calendar?2021/fall/courses/" + dept.toLowerCase() + "/" + num;
    console.log(urlMatch);
    axios
    .get(urlMatch)
    .then(course => {
      console.log(course);
      document.getElementById("todo-title").value = "?" + course.data.title;
      document.getElementById("todo-prerequisites").placeholder = course.data.prerequisites.replace("Prerequisite: ", "").replace("or Corequisite: ", "");
      // document.getElementById("todo-units").placeholder = "Default: " + course.data.units;
    })
    .catch(error => console.error(error));
  }

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Course Information</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-number">Number</Label>
              <Input
                type="text"
                id="todo-number"
                name="number"
                value={this.state.activeItem.number}
                onChange={this.handleChange}
                onBlur={this.fetchCourse}
                placeholder="e.g. CMPT 225"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Title</Label>
              <Input
                type="text"
                id="todo-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                // placeholder="e.g. Data Structures and Programming"
              />
              <FormText className="text-muted">
                Remove "?" for valid input.
                Hint retrieved from SFU official API
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="todo-prerequisites">Prerequisites</Label>
              <Input
                type="text"
                id="todo-prerequisites"
                name="prerequisites"
                value={this.state.activeItem.prerequisites}
                onChange={this.handleChange}
                // placeholder="e.g. CMPT 125, MACM 101"
              />
              <FormText className="text-muted">
                Use ", " (and nothing else) to split between prerequisites for map rendering. 
                Example input: STAT 270, MATH 151
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="todo-units">Units</Label>
              <Input
                type="text"
                id="todo-units"
                name="units"
                value={this.state.activeItem.units}
                onChange={this.handleChange}
                // placeholder="e.g. 3"
              />
              <FormText className="text-muted">
                Fill in for accurate GPA calculation. Default: 3
              </FormText>
            </FormGroup>            
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="todo-grade"></Label>
              <Input
                type="text"
                id="todo-grade"
                name="grade"
                value={this.state.activeItem.grade}
                onChange={this.handleChange}
                placeholder="If Completed, Grade: (i.e. B+)"
                disabled = {(this.state.activeItem.completed)? "" : "disabled"}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}