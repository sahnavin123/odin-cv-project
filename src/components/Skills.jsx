import React, { Component } from "react";

export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillTitle: "",
      editing: true,
      errorSkillTitle: false,
    };
  }

  handleChange = (e) => {
    this.setState({ skillTitle: e.target.value, errorSkillTitle: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { skillTitle } = this.state;
    const errorTitle = skillTitle.trim() === "";

    if (errorTitle === true) {
      this.setState({ errorSkillTitle: errorTitle });
    } else {
      this.setState({ editing: false, errorSkillTitle: false }, () => {
        this.props.onFormSubmit(skillTitle);
        this.setState({ skillTitle: "" });
      });
    }
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  render() {
    const { skillTitle, editing, errorSkillTitle } = this.state;
    return (
      <div>
        <h2>Skills</h2>
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="skillTitle">Skill Title:</label>
            <input
              type="text"
              id="skillTitle"
              value={skillTitle}
              onChange={this.handleChange}
            />
            {errorSkillTitle && (
              <p className="error-msg">Skill is required field</p>
            )}
            <button className="btn" onClick={this.handleSubmit}>
              submit
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
