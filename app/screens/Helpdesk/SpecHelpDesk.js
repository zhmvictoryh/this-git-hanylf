import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  Header,
  Icon,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import ModalDropdown_debtor from '@components/ModalDropdown_debtor';
import ModalDropdown_lotno from '@components/ModalDropdown_lotno';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SpecHelpDesk() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);

  const [urlApi, seturlApi] = useState(client);
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [dataDebtor, setDataDebtor] = useState([]);
  const [entity, setEntity] = useState('');
  const [project_no, setProjectNo] = useState('');
  const [db_profile, setDb_Profile] = useState('');
  const [spinner, setSpinner] = useState(true);

  const [debtor, setDebtor] = useState('');
  const [textDebtor, settextDebtor] = useState('');
  const [textNameDebtor, settextNameDebtor] = useState('');
  const [dataLotno, setDataLotno] = useState([]);
  const [textLot, setLotno] = useState('');
  const [reportName, setreportName] = useState(users.name);
  const [contactNo, setcontactNo] = useState('');
  const [requiredText, setrequiredText] = useState(false);
  const [textFloor, settextFloor] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: email,
      //   email: 'haniyya.ulfah@ifca.co.id',
      app: 'O',
    };

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // token: "",
      },
    };

    await axios
      .get(
        // `http://34.87.121.155:2121/apisysadmin/api/getProject/${data.email}`,
        `http://34.87.121.155:2121/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        // let dataArr = {};
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
            // const jsonValue = JSON.stringify(dat);
            //   setdataFormHelp(saveStorage);
            // console.log('storage', saveStorage);
            // dataArr.push(jsonValue);
          }
        });
        // AsyncStorage.setItem('@DataTower', dataArr);
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        alert('error get');
      });
  };

  //-----FOR GET DEBTOR
  const getDebtor = async data => {
    console.log('data for debtor', data);

    const params =
      '?' +
      'entity_cd=' +
      data.entity_cd +
      '&' +
      'project_no=' +
      data.project_no +
      '&' +
      'email=' +
      email;

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };
    await axios
      .post(urlApi + '/csentry-getDebtor' + params, {
        config,
      })
      .then(res => {
        // console.log('res', res);
        const datas = res.data;
        const dataDebtors = datas.Data;
        setDataDebtor(dataDebtors);

        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error.response);
        alert('error get');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      // setSpinner(false);
    }, 3000);
  }, []);

  const handleCheckChange = (index, data) => {
    setCheckedEntity(index);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    getDebtor(data);
  };

  const handleChangeModal = data => {
    data.data.map(dat => {
      if (dat) {
        setDebtor(dat.debtor_acct);
        settextDebtor(dat.debtor_acct + ' - ' + dat.name);
        settextNameDebtor(dat.name);
        getLot(dat.debtor_acct);
      }
    });
    setSpinner(false);
  };

  const getLot = async data => {
    const params = {
      entity_cd: entity,
      project_no: project_no,
      email: email,
    };
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(urlApi + '/csentry-getLotno', params, {
        config,
      })
      .then(res => {
        const datas = res.data;
        const dataLotno = datas.Data;
        setDataLotno(dataLotno);

        // return res.data;
      })
      .catch(error => {
        console.log('error get lotno api', error.response);
        alert('error get');
      });
  };

  const handleLotChange = lot => {
    console.log('lot', lot);
    setLotno(lot);
    // this.setState({textLot: lot});
    getFloor(lot);
  };

  const getFloor = async lot => {
    console.log('lot getfloor', lot);
    const lotno = lot;

    const params = {
      lotno: lotno,
    };

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(urlApi + '/csentry-getFloor', params, {
        config,
      })
      .then(res => {
        // console.log('res floor', res);
        const datas = res.data;

        const dataFloor = datas.Data;

        settextFloor(dataFloor);

        // return res.data;
      })
      .catch(error => {
        console.log('error get floor api', error.response);
        alert('error get');
      });
  };

  const handleNavigation = async () => {
    // try {
    console.log('textfloor spec help', textFloor);
    if (!contactNo && !reportName) {
      alert('Please Field Entry');
    }
    const saveStorage = {
      contactNo: contactNo,
      reportName: reportName,
      entity_cd: entity,
      project_no: project_no,
      dataDebtor: dataDebtor[0],
      lot_no: dataLotno[0],
      floor: textFloor,
    };
    const jsonValue = JSON.stringify(saveStorage);
    //   setdataFormHelp(saveStorage);
    console.log('awal mula props', saveStorage);

    await AsyncStorage.setItem('@helpdeskStorage', jsonValue);
    navigation.navigate('CategoryHelp', {saveStorage});
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('ticket')} //belum dibuat lang
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.wrap}>
        <Text title2>Ticket</Text>
        <Text headline style={{fontWeight: 'normal'}}>
          Form Help Desk
        </Text>

        <View style={[styles.subWrap, {paddingBottom: 0, marginBottom: 10}]}>
          <View>
            <Text style={{color: '#3f3b38', fontSize: 14}}>Choose Project</Text>
            {spinner ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder>
              </View>
            ) : (
              arrDataTowerUser.map((data, index) => (
                <CheckBox
                  key={index}
                  // checkedIcon="dot-circle-o"
                  // uncheckedIcon="circle-o"
                  title={data.project_descs}
                  checked={checkedEntity === index}
                  onPress={() => handleCheckChange(index, data)}
                />
              ))
            )}
          </View>
        </View>
        {checkedEntity === false ? null : (
          <View>
            <View style={{marginBottom: 5, paddingBottom: 0, marginTop: 5}}>
              <ModalDropdown_debtor
                label="Debtor"
                data={dataDebtor}
                onChange={() => handleChangeModal({data: dataDebtor})}
                value={textDebtor}
                style={{marginBottom: 0, paddingBottom: 0}}
              />
            </View>

            <Text
              style={{
                color: '#3f3b38',
                fontSize: 14,
                marginBottom: 0,
                paddingBottom: 0,
                marginTop: 0,
                paddingTop: 0,
              }}>
              Username
            </Text>
            <TextInput
              editable={false} //wajib true kalo mau di klik-klik / di isi manual
              value={textNameDebtor} //dari nama debtor
              onChangeText={text => settextNameDebtor(text)}
              style={{
                marginBottom: 0,
                paddingBottom: 0,
                marginTop: 0,
                paddingTop: 0,
              }}
            />
            <View style={{marginTop: 15}}>
              <ModalDropdown_lotno
                label="Lot No"
                data={dataLotno}
                onChange={option => handleLotChange(option.lot_no)}
                value={textLot}
              />
            </View>
            <View style={{marginTop: 0}}>
              <Text
                style={{
                  color: '#3f3b38',
                  fontSize: 14,
                  marginBottom: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  paddingTop: 0,
                }}>
                Report No
              </Text>
              <TextInput
                placeholder="Reported By"
                editable={true}
                value={reportName}
                onChangeText={text => setreportName(text)}
              />
            </View>
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  color: '#3f3b38',
                  fontSize: 14,
                  marginBottom: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  paddingTop: 0,
                }}>
                Contact No
              </Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="Contact No"
                editable={true}
                value={contactNo}
                onChangeText={text => setcontactNo(text)}
                required={requiredText}
              />
            </View>

            <Button
              style={{
                width: 100,
                height: 45,
                alignSelf: 'center',
                marginTop: 20,
              }}
              onPress={() => handleNavigation()}>
              <Text>Next</Text>
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
