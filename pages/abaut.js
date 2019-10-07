export default class extends React.Component {
  render(){
    return(
      <div>
        <img src="/static/react-logo.png" alt="react-abaut"></img>

        <h1> Abaut </h1>
        <p> Reto #1 del curso de Next.js</p>
        <p> Creado por <em>Paho C. Alapizco</em> </p>
        <style jsx>{`
          img {
            max-width: 50%;
            display: block;
            margin: 0 auto;
          }
          h1 {
            display: block;
            margin: 5px 0 0 0;
            color: #61dafb;
            white-space: normal;
            font-size: 40px;
          }
          p {
            color: white;
            font-weight: 50px;
            font-size: 20px;
          }
          :global(div) {
            display: flex;
            flex-direction: column;
            height: 100%;
            align-items: center;
            justify-content: space-around;
           
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
          }
        `}</style>

        <style jsx global>{`
          body { background: #44546b;}
        `}

        </style>
      </div>
    )
  }
} 