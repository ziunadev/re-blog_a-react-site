import React from 'react';
import Santri from './Santri'

export default class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSantri: [],
      listSantriResult: null,
      name: '',
      division: '',
      origin: '',
      isLoading: false,
      result: null,
      getEditedDataResult: null,
      deleteSantriResult: null
    }

    this.submitSantri = this.submitSantri.bind(this);
    this.getDataSantri = this.getDataSantri.bind(this);
    this.renderHere = this.renderHere.bind(this);
    this.updateSantri = this.updateSantri.bind(this);
    this.deleteSantri = this.deleteSantri.bind(this);
  }

  submitSantri() {
    this.setState(
      {isLoading: true},
      () => {
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('division', this.state.division);
        data.append('origin', this.state.origin);

        fetch(
          'http://localhost:3030/api/v1/santri',
          {
            method: 'POST',
            body: data
          }
        ).then((resp) => {
          var result;
          if (resp.status == 200) {
            result = 'ok';
          } else {
            result = `error : ${resp.status}`
          }
          this.setState({result: result, isLoading: false})
        }).catch((err) => {
          this.setState({result: `error : ${err.status}`, isLoading: false})
        })
      }
    )
  }

  getDataSantri() {
    fetch(
      'http://localhost:3030/api/v1/santri'
    )
    .then(async (resp) => {
      var result = {
        listSantri: null,
        listSantriResult: null
      }

      if (resp.status == 200) {
        const body = await resp.json();
        result.listSantri = body.data;
        result.listSantriResult = 'ok';
      } else {
        result.listSantri = [];
        result.listSantriResult = 'error';
      }
      this.setState(result);
    })
    .catch((err) => {
      this.setState({
        listSantri: [],
        listSantriResult: 'error'
      })
    })
  }

  updateSantri(id, data) {
    const body = new FormData();
    body.append('name', data.name);
    body.append('division', data.division);
    body.append('origin', data.origin);

    fetch(
      'http://localhost:3030/api/v1/santri/'+id,
      {
        method: 'PUT',
        body: body
      }
    ).then((resp) => {
      var result;
      if (resp.status == 200) {
        this.getDataSantri();
        result = 'ok';
      } else {
        result = 'error';
      }
      this.setState({getEditedDataResult: result})
    })
    .catch((err) => {
      this.setState({getEditedDataResult: 'error'})
    })
  }

  deleteSantri(id) {
    fetch(
      'http://localhost:3030/api/v1/santri/'+id,
      {
        method: 'DELETE'
      }
    ).then((resp) => {
      var result;
      if (resp.status == 204) {
        this.getDataSantri();
        result = 'delete successfull';
      } else {
        result = `delete failure, error : ${resp.status}`;
      }
      this.setState({deleteSantriResult: result});
    }).catch((err) => {
      this.setState({deleteSantriResult: 'error deleting current data'});
    })
  }

  render() {
    return(
      <div>
        <form>
          <label>Nama</label>
          <input type="text"
            onChange={(ev) => this.setState({name: ev.target.value})}
            value={this.state.name}
            />
          <label>Divisi</label>
          <input type="text"
            onChange={(ev) => this.setState({division: ev.target.value})}
            value={this.state.division}
            />
          <label>Asal</label>
          <input type="text"
            onChange={(ev) => this.setState({origin: ev.target.value})}
            value={this.state.origin}
            />

          <button
            type="button"
            onClick={this.submitSantri}
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={this.getDataSantri}
          >
            Ambil
          </button>
        </form>
        <div>
          {
            this.state.isLoading == true ?
            (
              <h1>Loading</h1>
            ) : null
          }
        </div>
        {this.state.result}
        {this.renderHere()}
        <table>
          <tr>
            <td>Nama&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>Divisi&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>Alamat&nbsp;&nbsp;&nbsp;&nbsp;</td>
          </tr>
          {this.state.listSantri.map(
            (el) => <Santri
                      santri={el}
                      key={el.id}
                      onUpdate={this.updateSantri}
                      onDelete={this.deleteSantri}
                    />
          )}
        </table>
      </div>
    )
  }
  renderHere() {
    if (this.state.result == 'ok') {
      return(
        <h2>Berhasil</h2>
      )
    } else if (this.state.result != 'ok' && this.state.result != null) {
      return(
        <h2>Error</h2>
      )
    }
  }
}
