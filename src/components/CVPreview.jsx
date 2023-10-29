import React, { Component } from "react";
import "../styles/cv-preview.css";

class CVPreview extends Component {
  handleDelete = (index, type) => {
    switch (type) {
      case "skills":
        this.props.onDeleteSkill(index);
        break;
      case "education":
        this.props.onDeleteEducation(index);
        break;
      case "experience":
        this.props.onDeleteExperience(index);
        break;
      default:
        break;
    }
  };

  render() {
    const { generalInfo, education, experience, skills } = this.props;
    const { name, email, phone, address, description } = generalInfo;

    return (
      <div className="main-container">
        <h2>CV Preview</h2>
        <div className="cv-preview">
          <div className="header">
            <h2>{name}</h2>
          </div>
          <div className="inner-container">
            <div className="profile-section border">
              <h4>Personal Details</h4>
              <div className="info">
                <section className="address">
                  <p className="sub-heading">Address</p>
                  <p className="text">{address}</p>
                </section>
                <section className="phone-number">
                  <p className="sub-heading">Phone Number</p>
                  <p className="text">{phone}</p>
                </section>
                <section className="email">
                  <p className="sub-heading">Email</p>
                  <p className="text">{email}</p>
                </section>
              </div>
            </div>
            <div className="description-section border">
              <h4>Description</h4>
              <div className="text">
                <p>{description}</p>
              </div>
            </div>
            <div className="education-section border">
              <h4>education</h4>
              {education.map((educationItem, index) => (
                <div className="details" key={index}>
                  <div className="education-name">
                    <p>{educationItem.school}</p>
                    <p>{educationItem.course}</p>
                  </div>
                  <p className="date">
                    {educationItem.startDate} to {educationItem.endDate}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => this.handleDelete(index, "education")}>
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="experience-section border">
              <h4>experience</h4>
              {experience.map((experienceItem, index) => (
                <div className="details" key={index}>
                  <div className="job-desc">
                    <p>{experienceItem.jobTitle}</p>
                    <p>{experienceItem.companyName} </p>
                    <p>{experienceItem.jobDesc} </p>
                  </div>
                  <p className="date">
                    {experienceItem.startDate} to {experienceItem.endDate}
                  </p>

                  <button
                    className="delete-btn"
                    onClick={() => this.handleDelete(index, "experience")}>
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="skills-section border">
              <h4>Skills</h4>
              <div className="skill-cards">
                {skills.map((skill, index) => (
                  <div className="skill-card details" key={index}>
                    <p className="">{skill}</p>
                    <button
                      className="delete-btn"
                      onClick={() => this.handleDelete(index, "skills")}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CVPreview;
