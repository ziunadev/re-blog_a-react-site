import React from 'react';

export default class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSantri: [],
      name: '',
      division: '',
      origin: '',
      isLoading: false,
      result: null
    }

    this.submitSantri = this.submitSantri.bind(this);
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
            method: "POST",
            body: data
          }
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
        })
      }
    )
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
          <div>
            {
              this.state.isLoading == true ?
              (
                <h1>Loading</h1>
              ) : null
            }
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
}
