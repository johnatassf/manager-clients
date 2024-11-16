import 'react-native-reanimated';
import { useForm, Controller } from "react-hook-form";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import {
    useNavigation,
} from '@react-navigation/native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';




type FormValues = {
    name: string;
    lastName: string;
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
    cep: string;
    city: string;
    state: string;
};


export default function RegisterClienteModal({ route, navigation }) {
    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();

    const [loading, setLoading] = useState(false);
    const [editPage, setEditPage] = useState(false);
    const theme = useTheme();
    let id: number;

    if (route.params)
        id = route?.params.id;


    const onSubmit = (data: FormValues) => {
        console.log(JSON.stringify(data));
        newClient(data);
    };
    const onSubmitUpdate = (data: FormValues) => {
        console.log(JSON.stringify(data));
        updateClient(data);
    };


    useEffect(() => {
        debugger;

        console.log('idddddddddd', id)
        if (id > 0) {
            getClientById(id);
            setEditPage(true);
        } else {
            const mock = generateMockClientData();
            (Object.keys(mock) as Array<keyof FormValues>).forEach(key => {

                setValue(key as keyof FormValues, mock[key]);
            })

        }


    }, [setValue]);

    async function getClientById(id: number) {
        const url = `http://localhost:8080/client/${id}`
        setLoading(true);

        const response = await fetch(url)
        const json: FormValues = await response.json();

        reset(json);

        setLoading(false);

    }

    async function newClient(client: any) {
        const url = 'http://localhost:8080/client'
        setLoading(true);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        }).then(() => {
            navigation.goBack();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })

    }

    async function updateClient(client: any) {
        const url = `http://localhost:8080/client/${id}`
        setLoading(true);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        }).then(() => {
            navigation.goBack();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })

    }


    async function deleteById(id: number) {
        const url = `http://localhost:8080/client/${id}`
        setLoading(true);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            navigation.goBack();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })

    }

    const fetchCepData = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                // Atualiza os campos do formulário com os dados recebidos
                setValue('street', data.logradouro);
                setValue('neighborhood', data.bairro);
                setValue('cep', data.cep);
                setValue('city', data.localidade);
                setValue('state', data.estado);
            } else {
                Alert.alert('Erro', 'CEP não encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar os dados do CEP.');
        }
    };




    return (

        <View style={styles.container}>
            {loading ? (
                <View >
                    <ActivityIndicator animating={true} size='large' />
                </View>
            ) : (
                <Card style={styles.card}>
                    {/* <Button onPress={navigation.goBack()}>Dismiss</Button> */}

                    {/*Informações client*/}
                    <Card style={styles.cardForm}>
                        <Card.Title title="Informações cliente" />
                        <Card.Content>
                            <View className='flex-col md:flex-row md:gap-10'>

                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{ required: "Nome é obrigatório." }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="Nome"
                                            style={styles.input}
                                        />
                                    )}
                                />
                                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={{ required: "Nome é obrigatório." }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="Sobrenome"
                                            style={styles.input}
                                        />
                                    )}
                                />
                                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                            </View>

                            <View className='md:flex-row md:gap-10'>
                                <Controller

                                    control={control}
                                    name="nickname"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="Apelido"
                                            style={styles.input}

                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="dateOfBirth"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="Data de Nascimento (DD/MM/AAAA)"
                                            style={styles.input}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="cpf"
                                    rules={{ required: "CPF é obrigatório." }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="CPF"
                                            keyboardType="numeric"
                                            style={styles.input}
                                        />
                                    )}
                                />
                                {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}

                            </View>



                            <Controller
                                control={control}
                                name="profession"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Profissão"
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="note"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Observações"
                                        style={styles.input}
                                    />
                                )}
                            />
                        </Card.Content>
                    </Card>

                    {/*Contato*/}

                    <Card style={styles.cardForm}>
                        <Card.Title title="Contato" />
                        <Card.Content>
                            <View className='flex-row gap-10'>
                                <Controller
                                    control={control}
                                    name="phone"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="Telefone"
                                            keyboardType="phone-pad"
                                            style={styles.input}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="email"

                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="E-mail"
                                            keyboardType="email-address"
                                            style={styles.input}

                                        />
                                    )}
                                />



                            </View>

                        </Card.Content>
                    </Card>

                    <Card style={styles.cardForm}>
                        <Card.Title title="Endereço" />
                        <Card.Content>
                            <Controller
                                control={control}
                                name="cep"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            onChange(text);
                                            if (text.length === 8) { // Verifica se o CEP tem 8 dígitos
                                                fetchCepData(text); // Chama a função ao alterar o CEP
                                            }
                                        }}
                                        value={value}
                                        placeholder="Cep"
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="street"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Rua"
                                        style={styles.input}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="number"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Número"
                                        keyboardType="numeric"
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="neighborhood"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Bairro"
                                        style={styles.input}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="city"
                                        style={styles.input}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="state"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Estado"
                                        style={styles.input}
                                    />
                                )}
                            />

                        </Card.Content>

                    </Card>



                    {editPage ?

                        (
                            <View className='flex-row gap-5 p-5 w-50 '>
                                <Button style={styles.buttonRegister} mode="contained" onPress={handleSubmit(onSubmitUpdate)} >Atualizar  </Button>
                                <Button style={styles.buttonRegister} mode="contained" theme={{ colors: { error: theme.colors.primary } }} onPress={() => { deleteById(id) }} >Deletar </Button>)
                            </View>
                        )
                        : (<View className='flex-row gap-5 p-5 w-100 '>
                            <Button style={styles.buttonRegister} mode="contained" onPress={handleSubmit(onSubmit)} >Salvar </Button>
                        </View>)

                    }

                </Card >
            )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        padding: 10,
        overflowY: 'auto'
    },
    title: {
        fontSize: 24,
        color: 'black',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        color: 'black',
    },
    error: {
        color: '#bf1650',
        marginBottom: 10,
    },
    buttonRegister: {
        width: '49%'
    },
    cardForm: {
        marginBottom: 10
    }


});



import { faker } from '@faker-js/faker';

const generateMockClientData = (): FormValues => {
    const mockData = {
        id: 0,
        name: faker.person.fullName(), // Nome completo
        lastName: faker.person.lastName(), // Adicionando sobrenome
        nickname: faker.person.zodiacSign(), // Apelido
        cpf: faker.number.int(11).toString(), // CPF fictício
        phone: faker.phone.number(), // Telefone
        email: faker.internet.email(), // E-mail
        street: faker.location.street(), // Rua
        number: faker.number.int({ min: 1, max: 100 }), // Número da casa
        neighborhood: faker.location.city(), // Bairro
        dateOfBirth: faker.date.between({ from: '2000-01-01', to: Date.now() }).toLocaleDateString('pt-BR'), // Data de Nascimento
        age: faker.number.int({ min: 1, max: 100 }), // Idade
        profession: faker.person.jobTitle(), // Profissão
        previousServices: faker.commerce.productName(), // Serviços Anteriores
        note: faker.lorem.sentence(),
        cep: faker.location.zipCode,
        city: '',
        state: '' // Observações
    }
    return mockData;
};

const mockClients = generateMockClientData();
console.log(mockClients);