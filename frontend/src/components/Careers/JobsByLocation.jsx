import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Careeejobs } from '../AllDatas/AllDatas'

const JobsByLocation = () => {
  const { city } = useParams()
  const decodedCity = decodeURIComponent(city || '')

  const jobs = Careeejobs.filter((j) => j.location === decodedCity)

  return (
    <div className="jobs-by-location container" style={{padding: '40px 20px'}}>
      <div className="section-title">
        <span>JOBS</span>
        <h2>Open Positions in {decodedCity}</h2>
        <p>Browse available roles in {decodedCity} and apply directly.</p>
      </div>

      {jobs.length === 0 ? (
        <div>
          <p>No current openings in {decodedCity}.</p>
          <p>You can still <Link to="/ApplyForJob">apply here</Link> and we'll consider you for future roles.</p>
        </div>
      ) : (
        <div className="jobs-grid" style={{display:'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap:16}}>
          {jobs.map((job, idx) => (
            <div className="job-card" key={idx} style={{padding:16, border:'1px solid #eee', borderRadius:8}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 style={{margin:0}}>{job.title}</h3>
                <div style={{fontSize:12, color:'#666'}}>{job.type}</div>
              </div>
              <p style={{margin:'8px 0'}}><strong>Location:</strong> {job.location}</p>
              <p style={{margin:'8px 0'}}><strong>Salary:</strong> {job.salary}</p>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <Link to="/ApplyForJob" className="primary-btn" style={{textDecoration:'none'}}>Apply Now</Link>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(decodedCity)}`} target="_blank" rel="noreferrer" className="secondary-btn">View Location</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default JobsByLocation
