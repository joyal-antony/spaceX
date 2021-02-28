import React, { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [result, setResult] = useState([])
  const [value, setValue] = useState([])
  const [launch_success, setLaunch_success] = useState('')
  const [land_success, setLand_success] = useState('')
  const [launch_year, setLaunch_year] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${land_success}&launch_year=${launch_year}`)
      .then(response => {
        setResult(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  };

  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v3/launches?limit=100`)
      .then(response => {
        setResult(response.data)
        setValue(response.data)
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  // console.log(result)
  const getUnique = (items, value) => {
    return [...new Set(items.map((item) => item[value]))]
  };
  let types = getUnique(value, "launch_year")

  // types = ['', ...types]

  types = types.map((item, index) => {
    return (
      <option value={item} key={index} >
        {item}
      </option>
    )
  })


  return (
    <div className="container">
      <form className="form-inline-form" >
        <div className="form-group">
          <label htmlFor="launch_success">Success Launch</label>
          <select
            name="launch_success"
            id='launch_success'
            className="form-control"
            onChange={(e) => setLaunch_success(e.target.value)}
          >
            <option value=''>all</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="land_success">Success Land</label>
          <select
            name="land_success"
            id='land_success'
            className="form-control"
            onChange={(e) => setLand_success(e.target.value)}
          >
            <option value=''>all</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="launch_year">Launch Year</label>
          <select
            name="launch_year"
            id='launch_year'
            className="form-control"
            onChange={(e) => setLaunch_year(e.target.value)}
          >
            <option value='' key='0'>all</option>
            {types}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" onClick={submitHandler}>Search</button>
        </div>
      </form>
      <div className="row">
        {result.map((res) => (
          <div className="col-sm-6 col-lg-3" key={res.flight_number}>
            <div className="card  m-3 ">
              <div className="card-header">{res.mission_name}</div>
              <div className="card-body">
                <img className="card-img-top" src={res.links.mission_patch} alt={res.mission_name}></img>

                <h5 className="card-title">{res.launch_year}</h5>
                <p className="card-text text-truncate">{res.details}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}

export default App;
