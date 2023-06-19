import React, { Component } from "react";
import "../styles/styles.css";

export default class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      editing: true,
      errors: {
        name: false,
        email: false,
        phone: false,
        address: false,
        description: false,
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

  validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, description } = this.state;

    const errors = {
      name: name.trim() === "",
      email: !this.validateEmail(email),
      phone: !this.validatePhoneNumber(phone),
      address: address.trim() === "",
      description: description.trim() === "",
    };

    if (Object.values(errors).some((error) => error === true)) {
      this.setState({ errors });
    } else {
      this.setState(
        {
          editing: false,
          errors: {
            name: false,
            email: false,
            phone: false,
            address: false,
            description: false,
          },
        },
        () => {
          this.props.onFormSubmit({ name, email, phone, address, description });
        }
      );
    }
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  render() {
    const { name, email, phone, address, editing, description, errors } =
      this.state;
    return (
      <div>
        <h2>General Info</h2>
        {editing ? (
          <form>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            {errors.name && (
              <p className="error-msg">Name is a required field</p>
            )}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && (
              <p className="error-msg">
                Please enter a valid email (e.g., abc@gmail.com)
              </p>
            )}
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={this.handleChange}
            />
            {errors.phone && (
              <p className="error-msg">
                Please enter a valid 10-digit phone number
              </p>
            )}
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
            {errors.address && (
              <p className="error-msg">Address is a required field</p>
            )}
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="6"
              value={description}
              onChange={this.handleChange}></textarea>
            {errors.description && (
              <p className="error-msg">Description is a required field</p>
            )}
            <button className="btn" onClick={this.onSubmit}>
              Submit
            </button>
          </form>
        ) : (
          <button className="btn edit-btn" onClick={this.handleEdit}>
            Edit
          </button>
        )}
      </div>
    );
  }
}
