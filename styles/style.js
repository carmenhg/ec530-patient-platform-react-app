import { Platform, StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  scroll: {
    backgroundColor: "white",
    flex: 1,
  },
  userRow: {
    alignItems: "center",
    padding: 15,
    marginTop: 80,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  switchRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20,
  },
  checkBoxRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  modalView: {
    backgroundColor: 'white'

  },
  textInput: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5,
    color: 'black',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold'
  },
  Title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
    textAlign: 'center',
    paddingLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    color: '#ffa500'
  },
  info_text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    color: 'white',
  },
  modal_text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: -20,
    marginTop: 15,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fa8072',
  },
  image: {
    width: Dimensions.get("window").width,
    marginTop: Platform.OS === 'ios' ? 15 : 15,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 50
  },
  button: {
    backgroundColor: '#4169e1', 
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5
  },
});