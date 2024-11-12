import 'react-native-reanimated';
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import {
    useNavigation,
} from '@react-navigation/native';
import { Button, Card } from 'react-native-paper';




type FormValues = {
    nome: string;
    apelido: string;
    cpf: string;
    telefone: string;
    email: string;
    rua: string;
    numero: string;
    bairro: string;
    dataNascimento: string;
    idade: string;
    profissao: string;
    servicosAnteriores: string;
    observacoes: string;
};


export default function RegisterClienteModal() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const navigation = useNavigation();

    const onSubmit = (data: FormValues) => {
        Alert.alert("Dados Enviados", JSON.stringify(data));
    };



    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                {/* <Button onPress={navigation.goBack()}>Dismiss</Button> */}
                <Text style={styles.title}>Cadastro de cliente</Text>

                <Controller
                    control={control}
                    name="nome"
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
                {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

                <Controller
                    control={control}
                    name="apelido"
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
                    name="telefone"
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
                    name="rua"
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
                    name="numero"
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
                    name="bairro"
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
                    name="dataNascimento"
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
                    name="idade"
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
                    name="profissao"
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
                    name="servicosAnteriores"
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
                    name="observacoes"
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
        borderRadius:0,
        padding: 10
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