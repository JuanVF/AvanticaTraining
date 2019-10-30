import React from 'react';
import Util from '../Util/Util';

import './Styles/Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    }
  }

  componentDidMount() {
    let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';
    let url = 'http://localhost:8080/resource';
    let params = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': access_token
      }
    };
    let context = this;

    fetch(url, params)
      .then((res) => res.json())
      .then((res) => {
        let parsedData = Util.ParseData.parseHomeData(res);
        //console.log(parsedData)
        context.setState({
          tableData: parsedData
        });
      })
      .catch(err => console.log(err));
  }

  generateTableContent = () => {
    let tableContent = this.state.tableData.map((item, index) => {
      return (
        <tr key={index}>
          <th>{item.topic.name}</th>
          <th>{item.topic.topic_id}</th>
        </tr>
      );
    });

    return tableContent;
  }

  render() {

    return (
      <section className="container">
        <h2>Top ten topics</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Resources</th>
            </tr>
          </thead>
          <tbody>
            {this.generateTableContent()}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Home;