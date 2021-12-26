import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as Google from 'expo-google-app-auth'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

const config = {
  androidClientId: '324085998144-b0hiqrkgdogjc5o2sqldd0uvtl9m2a0e.apps.googleusercontent.com',
  iosClientId: '324085998144-2rnaoahsvv564butu7eooo2t3idqgo8i.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
}

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
        } else {
          // Not logged in...
          setUser(null)
        }

        setLoadingInitial(false)
      }),
    []
  )

  const logout = () => {
    setLoading(true)

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }

  const signInWithGoogle = async () => {
    setLoading(true)

    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === 'success') {
          // login...
          const { idToken, accessToken } = logInResult
          const credential = GoogleAuthProvider.credential(idToken, accessToken)
          await signInWithCredential(auth, credential)
        }

        return Promise.reject()
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  )

  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
