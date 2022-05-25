import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

import Nav from '../../components/Nav'
import Search from '../../components/Search'
import Repositories from '../../components/Repositories'

import { getRepositories, createRepository, destroyRepository } from '../../services/api'

import './styles.css'

export default function MainPage() {

  const { user, logout } = useContext(AuthContext)

  const [ repositories , setRepositories ] = useState([])
  const [ loading, setLoading ] = useState(true);
  const [ loadingError, setLoadingError ] = useState(false)

  async function loadData(query = '') {
    try {
      const response = await getRepositories(user?.id, query);
      setRepositories(response.data)
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoadingError(true)
    }

  }

  useEffect(() => {
    (async () => await loadData())()
  }, [])

  function handleLogout() {
    logout();
  }

  function handleSearch(query) {
    loadData(query)
  }

  async function handleNewRepo(url) {
    console.log('Add repo', url)
    try {
      await createRepository(user?.id, url);
      await loadData();
    } catch (e) {
      console.error(e);
      setLoadingError(true)
    }
  }

  async function handleDeleteRepo(repository) {
    console.log('Delete', repository)
    await destroyRepository(user?.id, repository._id)
    await loadData();
  }

  if(loadingError) {
    return (
      <div className="loading">
        Error loading admin data. <Link to="/login">Back</Link>
      </div>
    )
  }

  if(loading) {
    return (
      <div className="loading">Loading...</div>
    )
  }

  return (
    <div id="main">
      <Nav onLogout={handleLogout} />

      <Search onSearch={handleSearch} />

      <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleNewRepo} />
    </div>
  )
}
