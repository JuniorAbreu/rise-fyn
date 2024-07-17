import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, TouchableOpacity, Modal } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from "../../hooks/useStorage";
import { CompanyModal } from "../../components/modal/companyModal";
import { Header } from "../../components/header";
import { ListItem } from "../../components/listItem";
import { AddButton } from "../../components/addButton";

export function Company() {
    const [companyList, setCompanyList] = useState([]);
    const [selectedCompany, setSelectedComany] = useState(null)
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const isFocused = useIsFocused();
    const { getItem } = useStorage();

    useEffect(() => {
        async function loadCompanies() {
            const companies = await getItem('@company').catch( error => console.error(error))
            setCompanyList(companies);
        }
        if (!showCompanyModal) {
            loadCompanies();
        } 
    }, [isFocused, showCompanyModal])
    

    return (
       <SafeAreaView className='flex-1 h-full'>
            <Header title={'Minhas empresas'}/>
            <FlatList
            className='flex-1 pt-4 border-black'
            data={companyList}
            renderItem={({item}) =>
                <ListItem text={item.name} onLongPress={() => {setSelectedComany(item); setShowCompanyModal(true)}}/>
            }
            keyExtractor={(item) => item.id}
            />
            <AddButton onPress={() => { setShowCompanyModal(true) }}/>
            <Modal visible={showCompanyModal} animationType='fade' transparent={true}>
                <CompanyModal company={selectedCompany} onClose={() => {setShowCompanyModal(false), setSelectedComany(null)}}/>
            </Modal>
        </SafeAreaView>
    )
}