import React, { useEffect, useState, Component } from 'react'
import firebase from '../../config/firebase'
import {withRouter} from 'react-router-dom'
import Navbar from '../header/Navbar';

import parse from 'html-react-parser'

const db = firebase.firestore();

export function dateCreated (dp) {
    const months = [ 
        "January", "February",  
        "March", "April", "May",  
        "June", "July", "August", 
        "September", "October",  
        "November", "December" 
    ];
    const date = new Date(dp*1000)

    return months[date.getMonth()]+ ' ' + date.getDate() + ', ' + date.getFullYear()
}

/*const Article = (props) => {

    const[isLoaded,setIsLoaded] = useState(false)
    const [article,setArticle] = useState([])

    useEffect(()=> {
        setIsLoaded(true)
    },[article])

     const getArticleByID = (id) => {
         db.collection('spatikal-db')
         .doc(id)
         .get()
         .then(doc=> {
             if(doc.exists){
                 console.log(doc.data())
                 setArticle(doc.data())
             }
             else {
                 props.history.push({pathname:'/'})
         }
         })
     }

    useEffect(()=> {
        if(typeof props.location.state !== 'undefined'){
            if(props.location.state.hasOwnProperty('article'))
            setArticle(props.location.state.article)

            console.log(props)
        }
         else {
             console.log("reached")
             getArticleByID(props.match.params.id)
         }
    },[])

    if(isLoaded){
        return (
            <>
                <Navbar/>
                <h1>{article.title}</h1>
                <h6>{dateCreated(article.datePosted.seconds)}</h6>
                <h6>{article.author}</h6>
                <h6>{article.category}</h6>
                <h3>{parse(article.content)}</h3>
            </>
        )
    }
    else
   { return (
        <>
         Loading...
        </>
    )}
}*/
class Article extends Component {
    constructor(props) {
        super(props);
        this.state={
            article:{},
            isLoaded: false
        }
    }
    componentDidMount() {
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.hasOwnProperty('article'))
            this.setState({
                article: this.props.location.state.article
            }, () => {
                this.setState({
                    isLoaded: true
                })
            })
        }
         else {
             this.getArticleByID(this.props.match.params.id)
         }
    }
    getArticleByID = (id) => {
        db.collection('spatikal-db')
        .doc(id)
        .get()
        .then(doc=> {
            if(doc.exists){
                this.setState({
                    article: doc.data()
                }, () => this.setState({
                    isLoaded: true
                }))
            }
            else {
                props.history.push({pathname:'/'})
        }
        })
    }
    render () {
        if(this.state.isLoaded){
            return (
                <>
                    <Navbar/>
                    <h1>{this.state.article.title}</h1>
                    <h6>{dateCreated(this.state.article.datePosted.seconds)}</h6>
                    <h6>{this.state.article.author}</h6>
                    <h6>{this.state.article.category}</h6>
                    <h3>{parse(this.state.article.content)}</h3>
                </>
            )
        }
        else
       { return (
            <>
             Loading...
            </>
        )}
    }
}
export default withRouter(Article)