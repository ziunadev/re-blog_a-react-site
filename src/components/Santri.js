import React from 'react';


export default class Santri extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      name: '',
      division: '',
      origin: ''
    }

    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.sumbitUpdatedForm = this.sumbitUpdatedForm.bind(this);
    this.renderUpdateForm = this.renderUpdateForm.bind(this);
    this.deleteCurrentForm = this.deleteCurrentForm.bind(this);
  }

  showUpdateForm() {
    this.setState({
      editMode: true,
      name: this.props.santri.name,
      division: this.props.santri.division,
      origin: this.props.santri.origin
    })
  }

  sumbitUpdatedForm() {
    this.setState(
      {editMode: false},
      this.props.onUpdate(
        this.props.santri.id,
        {
          name: this.state.name,
          division: this.state.division,
          origin: this.state.origin
        }
      )
    );
  }

  deleteCurrentForm() {
    this.props.onDelete(this.props.santri.id);
  }

  render() {
    if (this.state.editMode) {
      return this.renderUpdateForm();
    } else {
      return(
        <tr>
          <td>{this.props.santri.name}&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>{this.props.santri.division}&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>{this.props.santri.origin}&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <button onClick={this.showUpdateForm}>Edit</button>
          <button onClick={this.deleteCurrentForm}>Delete</button>
        </tr>
      )
    }
  }

  renderUpdateForm() {
    return(
      <li>
        <form>
          <label>Masukkan nama</label>
          <input
            type="text"
            onChange={(ev) => this.setState({name : ev.target.value})}
            value={this.state.name}
          />
          <label>Masukkan divisi</label>
          <input
            type="text"
            onChange={(ev) => this.setState({division: ev.target.value})}
            value={this.state.division}
          />
          <label>Masukkan Asal</label>
          <input
            type="text"
            onChange={(ev) => this.setState({origin: ev.target.value})}
            value={this.state.origin}
          />
          <button
            type="button"
            onClick={this.sumbitUpdatedForm}
          >
            Simpan Data
          </button>
          <button
            type="button"
            onClick={() => this.setState({editMode: false})}
          >
            Batal
          </button>
        </form>
      </li>
    )
  }
}
