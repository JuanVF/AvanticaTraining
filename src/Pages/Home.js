import React from 'react';
import Util from '../Util/Util';
import ls from 'local-storage';

import './Styles/Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    }
  }

  componentDidMount = async () => {
    let access_token = ls.get('login_token');

    let tableData = await Util.FetchResource.getAll(access_token);
    tableData = Util.ParseData.parseHomeData(tableData);

    this.setState({
      tableData: tableData
    })
  }

  generateTableContent = () => {
    let tableContent = this.state.tableData.map((item, index) => {
      return (
        <tr key={index}>
          <th>{item.topic}</th>
          <th>{item.num_resource}</th>
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