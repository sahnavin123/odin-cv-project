import "./App.css";
import React, { Component } from "react";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/CVPreview";
import Skills from "./components/Skills";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      },
      education: [],
      experience: [],
      skills: [],
    };
  }

  handleGeneralInfoSubmit = ({ name, email, phone, address, description }) => {
    const { generalInfo } = this.state;
    this.setState({
      generalInfo: {
        ...generalInfo,
        name,
        email,
        phone,
        address,
        description,
      },
    });
  };

  handleEducationSubmit = ({ school, course, startDate, endDate }) => {
    this.setState((prevState) => ({
      education: [
        ...prevState.education,
        { school, course, startDate, endDate },
      ],
    }));
  };

  handleSkillSubmit = ({ skillTitle }) => {
    this.setState(({ skills }) => {
      if (skills.includes(skillTitle)) {
        return null;
      }
      const updatedSkills = [...skills, skillTitle];
      return {
        skills: updatedSkills,
      };
    });
  };

  handleExperienceSubmit = ({
    companyName,
    jobTitle,
    startDate,
    endDate,
    jobDesc,
  }) => {
    this.setState(({ experience }) => ({
      experience: [
        ...experience,
        { companyName, jobTitle, startDate, endDate, jobDesc },
      ],
    }));
  };

  handleDeleteSkill = (index) => {
    this.setState((prevState) => {
      const updatedSkills = [...prevState.skills];
      updatedSkills.splice(index, 1);
      return { skills: updatedSkills };
    });
  };

  handleDeleteEducation = (index) => {
    this.setState((prevState) => {
      const updatedEducation = [...prevState.education];
      updatedEducation.splice(index, 1);
      return { education: updatedEducation };
    });
  };

  handleDeleteExperience = (index) => {
    this.setState((prevState) => {
      const updatedExperience = [...prevState.experience];
      updatedExperience.splice(index, 1);

      return { experience: updatedExperience };
    });
  };

  render() {
    const { generalInfo, education, experience, skills } = this.state;
    return (
      <div className="app">
        <div className="cv-container">
          <div className="edit-section">
            <GeneralInfo onFormSubmit={this.handleGeneralInfoSubmit} />
            <Education onFormSubmit={this.handleEducationSubmit} />
            <Experience onFormSubmit={this.handleExperienceSubmit} />
            <Skills onFormSubmit={this.handleSkillSubmit} />
          </div>
          <CVPreview
            className="cv-section"
            generalInfo={generalInfo}
            education={education}
            experience={experience}
            skills={skills}
            onDeleteSkill={this.handleDeleteSkill}
            onDeleteEducation={this.handleDeleteEducation}
            onDeleteExperience={this.handleDeleteExperience}
          />
        </div>
      </div>
    );
  }
}

export default App;
