import React from 'react';

export default class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSantri: [],
<<<<<<< HEAD
      listSantriResult: null,
      name: "",
      division: "",
      origin: "",
=======
      name: '',
      division: '',
      origin: '',
>>>>>>> e71a8800f13b6f4b3fc14287e5a35f7da0396498
      isLoading: false,
      result: null
    }

    this.submitSantri = this.submitSantri.bind(this);
    this.getListSantri = this.getListSantri.bind(this);
  }

  submitSantri() {
    this.setState(
      {isLoading: true},
      () => {
        const data = new FormData();
<<<<<<< HEAD
        data.append("name", this.state.name);
        data.append("division", this.state.division);
        data.append("origin", this.state.origin);
=======
        data.append('name', this.state.name);
        data.append('division', this.state.division);
        data.append('origin', this.state.origin);
>>>>>>> e71a8800f13b6f4b3fc14287e5a35f7da0396498

        fetch(
          'http://localhost:3030/api/v1/santri',
          {
            method: 'POST',
            body: data
          }
<<<<<<< HEAD
        )
        .then(async (resp) => {
          var result;
          if (resp.status == 200) {
            result = 'ok';
            this.getListSantri()
          } else {
            result = 'error';
          }
          this.setState({result: result, isLoading: false})
        })
        .catch((err) => {
          this.setState({result: 'error'})
=======
        ).then((resp) => {
          var result;
          if (resp.status == 200) {
            result = 'ok';
          } else {
            result = `error: ${resp.status}`;
          }
          this.setState({result: result, isLoading: false});
        }).catch((err) => {
          this.setState({result: `error : ${err.status}`})
>>>>>>> e71a8800f13b6f4b3fc14287e5a35f7da0396498
        })
      }
    )
  }

  getListSantri() {
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
      this.setState(result)
    })
    .catch((err) => {
      this.setState({
        listSantri: [],
        listSantriResult: 'error'
      })
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
            Simpan data
          </button>
          <button
            type="button"
            onClick={this.getListSantri}
          >
            Ambil Data Santri
          </button>
          <div>
            {this.state.isLoading == true ?
              (
                <h1>Loading</h1>
              ) : null}
          </div>
          <div>
            {this.renderHere()}
          </div>
          <div>
            <ul>
            {this.state.listSantri.map((el) => <li>{JSON.stringify(el)}</li>)}
            </ul>
          </div>
          <button
            type="button"
            onClick={this.getListSantri}
          >
            Ambil Data
          </button>
          <h1>{this.state.result}</h1>
        </form>
      </div>
    )
  }

  renderHere() {
    if (this.state.result == 'ok') {
      return(
        <h2>Berhasil</h2>
      )
    } else if (this.state.result == 'error') {
      return(
        <h2>Error</h2>
      )
    }
  }
}
