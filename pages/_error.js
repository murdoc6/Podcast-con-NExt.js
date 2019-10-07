import React from 'react'
import Layout from '../src/layout'
import Link from 'next/link'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props

    return (
      <Layout title="Oh no :(">
        { statusCode === 404 ?
          <div className="messaje">
            <h1> Esta página no existe!! :( </h1>
            <p> 
              <Link href="/">
                <a> Volver al Inicio</a>
              </Link>
            </p>
          </div>
          :
          <div className="messaje">
            <h1> Hubo un problema!! :( </h1>
            <p> Intentalo nuevamente en unos segundos</p>
          </div>
        }
        <style jsx>{`
          .messaje{
            padding: 100px 30px;
            text-align: center;
          }
          h1{
            margin-bottom: 2em;
          }
          a{
            color: #8756ca;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Error