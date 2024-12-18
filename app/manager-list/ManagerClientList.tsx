import * as React from 'react';
import { ActivityIndicator, Appbar, Card, DataTable } from 'react-native-paper';
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';


type Client = {
  id: number;
  name: string;
  nickname: string;
  cpf: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  neighborhood: string;
  dateOfBirth: string;
  age: string;
  profession: string;
  previousServices: string;
  note: string;
};

const ManageClientList = ({ navigation }) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [loading, setLoading] = React.useState(false); // Es
  const [clients, setclients] = React.useState<Client[]>([]);

  const {apiUrl}:any = Constants.expoConfig?.extra


  const from = 0; // Define the starting index
  const to = clients.length; // Define the ending index


  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const handleButtonPress = () => {
    Alert.alert("Button Pressed!");
  };

  async function getClients() {
    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}client`);
      const json = await response.json();

      setclients(json);
      return json; // Ensure this returns the fetched clients
    } catch (error) {
      console.log(error);
      setclients([]);// Return an empty array in case of an error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClients();
  }, [])


  useFocusEffect(
    React.useCallback(() => {
        getClients();
    }, [])
);


  return (

    <Card style={styles.card} >
      {loading ? (
        <View className='justify-center'>
          <ActivityIndicator animating={true} size='large' />
        </View>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title >Nick Name</DataTable.Title>
            <DataTable.Title numeric>Phone</DataTable.Title>
          </DataTable.Header>

          {clients.slice(from, to).map((client) => (
            <DataTable.Row onPress={() =>
              navigation.push('manager-list/registerClienteModal', {
                id: client.id,
              })} key={client.id} >
              <DataTable.Cell >{client.name}</DataTable.Cell>
              <DataTable.Cell numeric>{client.nickname}</DataTable.Cell>
              <DataTable.Cell numeric>{client.cpf}</DataTable.Cell>
            </DataTable.Row>
          ))}

          {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        /> */}
        </DataTable>
      )
      }
    </Card >
  );
};

export default ManageClientList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0

  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  table: {
    height: '100%',
    borderWidth: 0
  },
  tableRow: {
    // height:'100%',
    borderLeftWidth: 0
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


})