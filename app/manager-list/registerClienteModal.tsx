import 'react-native-reanimated';
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import {
    useNavigation,
} from '@react-navigation/native';
import { Button, Card } from 'react-native-paper';
import { useEffect } from 'react';




type FormValues = {
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


export default function RegisterClienteModal() {
    const { control, handleSubmit, formState: { errors }, setValue} = useForm<FormValues>();
    const navigation = useNavigation();

    const onSubmit = (data: FormValues) => {
        newClient(data);
    };

    useEffect(() => {
        const mock = generateMockClientData();
        (Object.keys(mock) as Array<keyof FormValues>).forEach(key => {

            setValue(key as keyof FormValues, mock[key]);
        })
     
        }, [setValue]);

    async function newClient(client: any) {
        const url = 'http://localhost:8080/client'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })

        const newClient = await response.json();

    }



    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                {/* <Button onPress={navigation.goBack()}>Dismiss</Button> */}
                <Text style={styles.title}>Cadastro de cliente</Text>

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
                    rules={{ required: "E-mail é obrigatório." }}
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
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

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
                    name="age"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Idade"
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    )}
                />

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
                    name="previousServices"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Serviços Anteriores"
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
                <View className='flex-row gap-10 '>

                    <Button mode="outlined" onPress={() => navigation.goBack()} > Cancelar </Button>
                    <Button mode="outlined" onPress={handleSubmit(onSubmit)} >Cadastrar </Button>
                </View>
            </Card>
        </View>
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


});



import { faker } from '@faker-js/faker';

const generateMockClientData = (): FormValues => {
    const mockData = {
            id: 0,
            name: faker.person.fullName(), // Nome completo
            nickname: faker.person.zodiacSign(), // Apelido
            cpf: faker.number.int(11).toString(), // CPF fictício
            phone: faker.phone.number(), // Telefone
            email: faker.internet.email(), // E-mail
            street: faker.location.street(), // Rua
            number: faker.number.int({ min: 1, max: 100 }), // Número da casa
            neighborhood: faker.location.city(), // Bairro
            dateOfBirth:faker.date.between({ from: '2000-01-01', to: Date.now() }).toLocaleDateString('pt-BR'), // Data de Nascimento
            age: faker.number.int({ min: 1, max: 100 }), // Número , // Idade
            profession: faker.person.jobTitle(), // Profissão
            previousServices: faker.commerce.productName(), // Serviços Anteriores
            note: faker.lorem.sentence(), // Observações
      
    }
    return mockData;
};

const mockClients = generateMockClientData();
console.log(mockClients);