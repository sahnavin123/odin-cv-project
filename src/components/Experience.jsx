import React, { Component } from "react";
import "../styles/styles.css";

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      jobDesc: "",
      editing: true,
      errors: {
        companyName: false,
        jobTitle: false,
        startDate: false,
        endDate: false,
        jobDesc: false,
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
  };

  validateDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  validateEndDate = (startDate, endDate) => {
    console.log(startDate);
    console.log(new Date(startDate));
    return new Date(endDate) >= new Date(startDate);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { companyName, jobTitle, startDate, endDate, jobDesc } = this.state;

    const errors = {
      companyName: companyName.trim() === "",
      jobTitle: jobTitle.trim() === "",
      startDate: startDate.trim() === "" || !this.validateDate(startDate),
      endDate:
        endDate.trim() === "" ||
        !this.validateDate(endDate) ||
        !this.validateEndDate(startDate, endDate),
      jobDesc: jobDesc.trim() === "",
    };

    Object.values(errors).some((error) => error === true)
      ? this.setState({ errors })
      : (() => {
          this.setState(
            {
              companyName: "",
              jobTitle: "",
              startDate: "",
              endDate: "",
              jobDesc: "",
              editing: false,
              errors: {
                companyName: false,
                jobTitle: false,
                startDate: false,
                endDate: false,
                jobDesc: false,
              },
            },
            () => {
              this.props.onFormSubmit({
                companyName,
                jobTitle,
                startDate,
                endDate,
                jobDesc,
              });
            }
          );
        })();
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  render() {
    const {
      companyName,
      jobTitle,
      startDate,
      endDate,
      jobDesc,
      editing,
      errors,
    } = this.state;

    return (
      <div>
        <h2>Experience</h2>
        {editing ? (
          <form onSubmit={this.onSubmit}>
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={this.handleChange}
            />
            {errors.companyName && (
              <p className="error-msg">Company Name is a required field</p>
            )}
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={jobTitle}
              onChange={this.handleChange}
            />
            {errors.jobTitle && (
              <p className="error-msg">Job Title is a required field</p>
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
            <label htmlFor="jobDesc">Job Description:</label>
            <textarea
              id="jobDesc"
              name="jobDesc"
              value={jobDesc}
              onChange={this.handleChange}></textarea>
            {errors.jobDesc && (
              <p className="error-msg">Job Description is required field</p>
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
