import React, { Component } from "react";
import "../styles/styles.css";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      course: "",
      startDate: "",
      endDate: "",
      editing: true,
      errors: {
        school: false,
        course: false,
        startDate: false,
        endDate: false,
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: false,
      },
    }));
    this.setState({ [e.target.name]: e.target.value });
  };

  validateDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  validateEndDate = (startDate, endDate) => {
    return new Date(endDate) >= new Date(startDate);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { school, course, startDate, endDate } = this.state;

    const errors = {
      school: school.trim() === "",
      course: course.trim() === "",
      startDate: startDate.trim() === "" || !this.validateDate(startDate),
      endDate:
        endDate.trim() === "" ||
        !this.validateDate(endDate) ||
        !this.validateEndDate(startDate, endDate),
    };

    if (Object.values(errors).some((error) => error === true)) {
      this.setState({ errors });
    } else {
      this.setState(
        {
          school: "",
          course: "",
          startDate: "",
          endDate: "",
          editing: false,
          errors: {
            school: false,
            course: false,
            startDate: false,
            endDate: false,
          },
        },
        () => {
          this.props.onFormSubmit(school, course, startDate, endDate);
        }
      );
    }
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  render() {
    const { school, course, startDate, endDate, editing, errors } = this.state;
    return (
      <div>
        <h2>Education</h2>
        {editing ? (
          <form onSubmit={this.onSubmit}>
            <label htmlFor="school">School Name:</label>
            <input
              type="text"
              id="school"
              name="school"
              value={school}
              onChange={this.handleChange}
            />
            {errors.school && (
              <p className="error-msg">School Name is required field</p>
            )}
            <label htmlFor="course">Course Name:</label>
            <input
              type="text"
              id="course"
              name="course"
              value={course}
              onChange={this.handleChange}
            />
            {errors.course && (
              <p className="error-msg">Course Name is a required field</p>
            )}
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={this.handleChange}
            />
            {errors.startDate && (
              <p className="error-msg">please enter valid start date</p>
            )}
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={this.handleChange}
            />
            {errors.endDate && (
              <p className="error-msg">
                end date must be ending after start date
              </p>
            )}
            <button className="btn" type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </form>
        ) : (
          <button className="btn edit-btn" onClick={this.handleEdit}>
            Add New
          </button>
        )}
      </div>
    );
  }
}

export default Education;
