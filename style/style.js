import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center',
  },
  dicepoints:{
    flexDirection: 'row',
    width: 280,
    alignContent: 'center'
  },
  disabledButton: {
    backgroundColor: 'gray',
    opacity: 0.5
  },frontPageText:{
    fontSize: 20
  },textInput:{
    borderWidth: 2,
    borderColor: "#73CED6",
    width: '80%'
  },frontpageButton: {
    margin: 5,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },gameInfo: {
    fontSize: 15,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    margin: 10 
  },scoreboardText:{
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    margin: 10,
    fontSize: 15 
  },gameTotalPoints:{
    fontSize: 20,

  },materialIcon:{
    marginTop: -50
  },emptyScoreboardText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },topPlayers:{
    fontSize: 20,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    margin: 10
  }
});

