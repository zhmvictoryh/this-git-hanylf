import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
  Header,
  Icon,
  CategoryIconSoft,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox, Badge} from 'react-native-elements';
import {Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatusHelp({route}) {
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
  const [entity, setEntity] = useState('');
  const [project_no, setProjectNo] = useState('');
  const [db_profile, setDb_Profile] = useState('');
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [dataStatus, setDataStatus] = useState([]);
  const [show, setShow] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  //   console.log('passprop kategori help', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: email,
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
        `http://34.87.121.155:2121/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
          }
        });
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        alert('error get');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);

      // getCategoryHelp;
      // setSpinner(false);
    }, 3000);
  }, []);

  const handleCheckChange = (index, data) => {
    setCheckedEntity(index);
    setShow(true);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    getTicketStatus(data);
  };

  const getTicketStatus = async data => {
    console.log('data for status', data);
    const dT = data;

    const formData = {
      entity_cd: dT.entity_cd,
      project_no: dT.project_no,
      email: email,
    };

    console.log('formdata', formData);
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(
        'http://34.87.121.155:8181/apiwebpbi/api/csallticket-getstatus/IFCAPB',
        formData,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        console.log('data kategori', datas.Error);
        if (datas.Error === false) {
          const datastatus = datas.Data;
          setDataStatus(datastatus);
        } else {
          setDisabled(false);
        }

        // setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get status api', error.response);
        alert('error get');
      });
  };

  const handleNavigation = (data, ticketStatus) => {
    console.log('data where tiket statuss', data);
    console.log('tikett status', ticketStatus);
    setDisabled(true);
    getTicketWhereStatus(data, ticketStatus);
  };
  const getTicketWhereStatus = async (data, ticketStatus) => {
    console.log('data where', data);
    console.log('tiket state where', ticketStatus);

    const formData = {
      email: email,
      status: ticketStatus,
    };
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };
    await axios
      .post(
        'http://34.87.121.155:8181/apiwebpbi/api/csallticket-getwherestatus/IFCAPB',
        formData,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        console.log('data datastatuswhere', datas);
        const datastatuswhere = datas.Data;
        // navigation.navigate('ViewHistoryStatus', {datastatuswhere}); //sementara krn data 0
        if (datas.Error === false) {
          const datastatuswhere = datas.Data;
          // setDataStatus(datastatus);
          navigation.navigate('ViewHistoryStatus', datastatuswhere);
          console.log('datastatuswhere', datastatuswhere);
        } else {
          setDisabled(false);
        }

        // setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get where status api', error.response);
        alert('error get');
      });
  };

  //    const onCategoryPress = cat => {
  //        this.setState({isDisabled: true}, () => {
  //          this.goToScreen('screen.SelectCategory', cat);
  //        });
  //      };
  const ds = dataStatus;
  //   console.log('ds', ds);
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('status')} //belum dibuat lang
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
          Status Help
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

          {show ? (
            <View style={{marginTop: 30, marginHorizontal: 10}}>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'R'")}
                disabled={ds.cntopen == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#555',
                  //   paddingTop: 1,
                }}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    // alignSelf: 'center',
                  }}>
                  <CategoryIconSoft
                    isRound
                    size={25}
                    icon={'tasks'}
                    // style={{marginTop: 10}}
                  />
                  {/* <Image
                    source={require('@assets/images/icon-helpdesk/newtiket.png')}
                    style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    Open
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#42B649',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}
                    value={
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        {ds.cntopen}
                      </Text>
                    }></Badge>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleNavigation(dataTowerUser, "'A','P','M','F','Y','Z'")
                }
                disabled={ds.cntopen == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#555',
                  //   marginBottom: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    // alignSelf: 'center',
                  }}>
                  <CategoryIconSoft
                    isRound
                    size={25}
                    icon={'hourglass-half'}
                    style={{marginTop: 10}}
                  />
                  {/* <Image
                    source={require('@assets/images/icon-helpdesk/newtiket.png')}
                    style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    Process
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#42B649',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}
                    value={
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        {ds.cntprocces}
                      </Text>
                    }></Badge>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'V'")}
                disabled={ds.cntopen == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#555',
                  //   marginBottom: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    // alignSelf: 'center',
                  }}>
                  <CategoryIconSoft
                    isRound
                    size={25}
                    icon={'times'}
                    style={{marginTop: 10}}
                  />
                  {/* <Image
                    source={require('@assets/images/icon-helpdesk/newtiket.png')}
                    style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    Cancel
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#42B649',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}
                    value={
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        {ds.cntcancel}
                      </Text>
                    }></Badge>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'C'")}
                disabled={ds.cntopen == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#555',
                  //   marginBottom: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    // alignSelf: 'center',
                  }}>
                  <CategoryIconSoft
                    isRound
                    size={25}
                    icon={'check-double'}
                    style={{marginTop: 10}}
                  />
                  {/* <Image
                    source={require('@assets/images/icon-helpdesk/newtiket.png')}
                    style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    Close
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#42B649',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}
                    value={
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        {ds.cntclose}
                      </Text>
                    }></Badge>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>Choose Prooject First</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
