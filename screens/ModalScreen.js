import { useNavigation } from '@react-navigation/native'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'

const ModalScreen = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [image, setImage] = useState(null)
  const [job, setJob] = useState(null)
  const [age, setAge] = useState(null)

  const incompleteForm = !firstName || !lastName || !image || !job || !age

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      googleName: user.displayName,
      firstName: firstName,
      lastName: lastName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <View style={tw('flex-1 items-center pt-1')}>
      <Image style={tw('h-20 w-full')} resizeMode="contain" source={{ uri: 'https://links.papareact.com/2pf' }} />

      <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>Welcome {user.googleName}</Text>

      <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 1: The Name</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your First Name"
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your Last Name"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 2: The Profile Pic</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter a Profile Pic URL"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 3: The Job</Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your occupation"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 4: The Age</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter your age"
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw('w-64 p-3 rounded-xl absolute bottom-10 bg-red-400'),
          incompleteForm ? tw('bg-gray-400') : tw('bg-red-400'),
        ]}
        onPress={updateUserProfile}
      >
        <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModalScreen
