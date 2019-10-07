
import Link from 'next/link'
import Layout from '../src/layout'
import ChannelGrid from '../src/channels'
import PodcastListWhitClick from '../src/podcastListWhitClick'
import Error from './_error'
import PodcastPlayer from './../src/podcastPlayer';

export default class Channel extends React.Component {
  constructor(props){
    super(props)
    this.state = { openPodcast: null }
  }
  static async getInitialProps({ query, res }){
    // query = los datos que traemos por la URL de la pagina.
    let id = query.id
    try {
      let [ reqChannel, reqAudio, reqSeries ] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${id}`),
        fetch(`https://api.audioboom.com/channels/${id}/audio_clips`),
        fetch(`https://api.audioboom.com/channels/${id}/child_channels`)
      ])
      if(reqChannel.status >= 404){
        res.statusCode = reqChannel.status
        return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status } 
      }
      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel
  
      let dataAudio = await reqAudio.json()
      let audioClips = dataAudio.body.audio_clips
      
      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels
  
      return { channel, audioClips, series, statusCode:200  }
    } catch(e){
      return { channel: null, audioClips: null, series: null, statusCode: 503 }
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = (event) => {
    event.preventDefault() 
    this.setState({
      openPodcast: null
    })
  }
  
  render(){
    const { channel, audioClips, series, statusCode } = this.props
    const { openPodcast } = this.state

    if( statusCode !== 200){
      return <Error  statusCode={ statusCode }/>
    }

    return (
      <Layout title={channel.title}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        
        { openPodcast 
          &&
          <div className="modal">
           <PodcastPlayer clip={openPodcast} onClose={ this.closePodcast }/>
          </div>}

        <h1> { channel.title } </h1>
        { 
          series.length > 0 &&
          <div>
            <h1> Series </h1>
            <ChannelGrid channels={series} />
          </div>
        }
        <h1> útimos Podcast </h1>
       <PodcastListWhitClick 
        podcasts={ audioClips }
        onClickPodcast={ this.openPodcast }
       />

        <style jsx>{`
          h1 {
            padding: 15px;
            font-weight: 600;
          }
          .banner{
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          .modal{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 99999;
          }
        `}</style>
        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white
          }
        `}</style>
      </Layout>
      
    )
  }
}