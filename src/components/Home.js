import React,{useState,useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import getRepos from '../services/githubApiService'
import { NavBar } from './NavBar'
import {BsStar,BsFillStarFill} from 'react-icons/bs'
import '../styles/Home.css'

export const Home = () => {
    const [repos, setRepos] = useState([])
    const [showFavListInScreen,setShowFavListInScreen] = useState(false)
    useEffect(() => {
        getRepos().then(repos=>{
            console.log(repos)
            setRepos(repos)
        })
    }, [setRepos])

    const makeFav = (idx) =>{
        let newState = [...repos]
        newState[idx].fav=true
        setRepos(newState)
    }

    const removeFav = (idx) =>{
        let newState = [...repos]
        newState[idx].fav=false
        setRepos(newState)
    }

    const showFavList = () =>{
        setShowFavListInScreen(!showFavListInScreen)
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="options">
                {!showFavListInScreen && <Button variant="dark" type="button" onClick={showFavList}>Show my favorite repositories list</Button>}
                {showFavListInScreen && <Button variant="dark" type="button" onClick={showFavList}>Show all repositories</Button>}
            </div>
            <Table striped bordered hover size="sm" className="repos-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((repo,idx)=>{

                        {if (showFavListInScreen && (repo.fav=== undefined || !repo.fav)) {}
                        else {return <tr key={repo.id}>
                                    <td>{idx+1}</td>
                                    <td>{repo.name}</td>
                                    { (repo.fav=== undefined || !repo.fav) && <td><span className="not-fav" onClick={ (e) => makeFav(idx)}><BsStar/></span></td>} 
                                    { (repo.fav!== undefined && repo.fav) && <td><span className="fav" onClick={ (e) => removeFav(idx)}><BsFillStarFill/></span></td>} 
                                </tr>
                        }
                        }
                    })}
                </tbody>
            </Table>
            
            
        </div>
    )
}
