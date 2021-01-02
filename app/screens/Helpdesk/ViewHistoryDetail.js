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
  Image,
  CategoryIconSoft,
} from '@components';
import {BaseColor, BaseStyle, useTheme, Images} from '@config';
import {CheckBox, Badge} from 'react-native-elements';
// import {Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

import Modal from 'react-native-modal';

import SegmentedControlTab from 'react-native-segmented-control-tab';

export default function ViewHistoryDetail({route}) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [name, setName] = useState(users.name);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);

  const [dataTiketMulti, setDataTiketMulti] = useState([]);
  const [dataImageMulti, setDataImageMulti] = useState([]);
  const [dataAction, setDataAction] = useState([]);
  const [dataTiketPassProp, setDataTiketPassProp] = useState(route.params);
  const deviceWidth = Dimensions.get('window').width;
  const [isImageViewVisible, setImageViewVisible] = useState();
  const [url_image, setUrl_Image] = useState();
  const [image_solved, setImageSolved] = useState();
  //   const [images, setImage] = useState(url_image);
  const [images, setImage] = useState(imagesDummy); //sementara aja
  const selectedPayment = {
    type: 'C',
    descs: 'Cash',
  };
  const widthStyle = {
    width: (deviceWidth * 2) / 5,
    // width: deviceWidth / 2,
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  //   console.log('passprop kategori help', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  const imagesDummy = [
    {
      id: '1',
      image: require('@assets/images/icon-helpdesk/newtiket.png'),
      selected: true,
    },
    {
      id: '2',
      image: require('@assets/images/icon-helpdesk/history.png'),
      //   selected: true,
    },
    {id: '3', image: Images.location2},
    {id: '4', image: Images.location3},
    {id: '5', image: Images.location4},
    {id: '6', image: Images.location5},
    {id: '7', image: Images.location6},
    {id: '8', image: Images.location7},
  ];

  //   console.log('images dummy', imagesDummy[0].image);
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

  const getTicketDetailMulti = async data => {
    const formData = {
      entity: data.entity_cd,
      project: data.project_no,
      report_no: data.report_no,
      email: email,
    };

    // console.log('form data multi', formData);

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(
        'http://34.87.121.155:8181/apiwebpbi/api/csallticket-getticketmulti/IFCAPB',
        formData,
        {config},
      )
      .then(res => {
        // console.log('res tiket multi', res.data);
        const resTiketMulti = res.data.Data[0];
        const resImageMulti = res.data.DataImage; //
        const resDataAction = res.data.DataAction; //diisi oleh engineer,

        console.log('resImageMulti', resImageMulti);
        // console.log('resDataAction', resDataAction);

        setDataTiketMulti(resTiketMulti);
        setDataImageMulti(resImageMulti);
        setDataAction(resDataAction);
        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('err data multi', error);
        alert('error nih');
      });
  };

  const getSolvedPicture = async data => {
    const formData = {
      report_no: 'EX21090021', //hardcode dulu
      // report_no: data.report_no,
    };

    // console.log('form data multi', formData);

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(
        'http://34.87.121.155:8181/apiwebpbi/api/csupdate-getsolvedpict',
        formData,
        {config},
      )
      .then(res => {
        // console.log('res tiket multi', res.data);
        const resGalleryService = res.data;

        console.log('resGalleryService', resGalleryService);
        setImageSolved(resGalleryService);

        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('err data multi', error);
        alert('error nih');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      setImageViewVisible(false); // getCategoryHelp;
      // setSpinner(false);
      //   console.log('routeparams', route.params);
      //   setDataHistoryStatus(route.params);
      getTicketDetailMulti(route.params);
      getSolvedPicture(route.params);
    }, 3000);
  }, []);

  const handleIndexChange = index => {
    console.log('index langsung klik', index);

    // this.setState({
    //   selectedIndex: index,
    // });
    setSelectedIndex(index);

    console.log('Selected index', selectedIndex);
  };

  //   const saveConfirm = () => {
  //     const data = dataTiketPassProp;
  //     const formData = {
  //       entity: data.entity_cd,
  //       project: data.project_no,
  //       reportno: data.report_no,
  //       name: name,
  //       email: email,
  //       assignto: data.assign_to,
  //       payment_method: selectedPayment.type,
  //     };
  //     console.log('dataTicket', formData);

  //     // fetch(urlApi + 'c_ticket_history/saveConfirm/IFCAPB/', {
  //     //   method: 'POST',
  //     //   body: JSON.stringify(formData),
  //     // })
  //     //   .then(response => response.json())
  //     //   .then(res => {
  //     //     console.log('saveConfirm', res);
  //     //     this.showAlert(res.Pesan);
  //     //   })
  //     //   .catch(error => {
  //     //     console.log(error);
  //     //   });
  //   };

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
          View History Ticket Detail
        </Text>

        {spinner ? (
          <View>
            {/* <Spinner visible={this.state.spinner} /> */}
            <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
              <PlaceholderLine width={100} noMargin style={{height: 40}} />
            </Placeholder>
          </View>
        ) : dataTiketMulti.length !== 0 ? (
          <View>
            <SegmentedControlTab
              values={['Detail', 'Feedback']}
              selectedIndex={selectedIndex}
              //   selectedIndex={1}
              onTabPress={index => handleIndexChange(index)}
              //   onTabPress={index => setSelectedIndex(index)}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
            />
            <ScrollView>
              {selectedIndex === 0 && (
                <View style={{margin: 5, paddingRight: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Ticket No</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>
                        # {dataTiketMulti.report_no}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Date</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>
                        {moment(dataTiketMulti.reported_date).format(
                          'DD-MM-YYYY hh:mm',
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Name</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.name}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Unit</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.lot_no}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Contact No</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.contact_no}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Reported By</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketPassProp.reported_by}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // width: '60%', //sementara, kalo udah ada isinya, ini di hide lagi
                    }}>
                    <View style={widthStyle}>
                      <Text>Complain Type</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text style={{flexWrap: 'wrap'}}>
                        Requested
                        {/* hardcode coy */}
                        {/* dari get data multi gak ada complain_type? */}
                        {/* {dataTiketMulti.status == 'C' ? 'Complain' : 'Request'} */}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Category</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.category}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={widthStyle}>
                      <Text>Status</Text>
                    </View>
                    <View style={{width: 10}}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>
                        {dataTiketMulti.status == 'R'
                          ? 'Open'
                          : dataTiketMulti.status == 'A'
                          ? 'Assign'
                          : dataTiketMulti.status == 'S'
                          ? 'Need Confirmation'
                          : dataTiketMulti.status == 'P'
                          ? 'Procces'
                          : dataTiketMulti.status == 'F'
                          ? 'Confirm'
                          : dataTiketMulti.status == 'V'
                          ? 'Solve'
                          : dataTiketMulti.status == 'C'
                          ? 'Completed'
                          : dataTiketMulti.status == 'D'
                          ? 'Done'
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginTop: 10}}>
                    <View>
                      <Text>Work Requested</Text>
                    </View>
                    <View>
                      <View
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderColor: '#555',
                          borderRadius: 10,
                          borderWidth: 1,
                          padding: 5,
                        }}>
                        <Text style={{width: '100%'}}>
                          {dataTiketMulti.work_requested}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>
                      Gallery of Request
                    </Text>
                  </View>
                  <View>
                    {dataImageMulti.map((item, key) => {
                      return (
                        <TouchableOpacity
                          key={key}
                          style={{flex: 1}}
                          activeOpacity={1}
                          onPress={() =>
                            navigation.navigate('PreviewImageHelpdesk', {
                              images: dataImageMulti,
                            })
                          }>
                          <Image
                            key={key}
                            style={{
                              flex: 1,
                              width: '100%',
                              height: 400,
                              marginTop: 20,
                            }}
                            source={{uri: `${item.file_url}`}}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>
                      Gallery of Solved
                    </Text>
                  </View>
                  <View style={{marginBottom: '40%'}}>
                    {image_solved?.map((item, key) => {
                      return (
                        // <View key={key}>
                        <TouchableOpacity
                          key={key}
                          style={{flex: 1}}
                          activeOpacity={1}
                          onPress={() =>
                            navigation.navigate('PreviewImageHelpdesk', {
                              images: image_solved,
                            })
                          }>
                          <Image
                            key={key}
                            style={{
                              flex: 1,
                              width: '100%',
                              height: 400,
                              marginTop: 10,
                            }}
                            source={{uri: `${item.file_url}`}}
                          />
                        </TouchableOpacity>
                        // </View>
                      );
                    })}
                  </View>

                  {/* //contoh bikin signature  dtaro  sini */}
                  {/* {
                    (dataTiketMulti.status == 'A',
                    'P',
                    'M',
                    'F',
                    'Y',
                    'Z' ? (
                      <View>
                        <Button>
                          <Text>{dataTiketMulti.status} ada</Text>
                        </Button>
                      </View>
                    ) : (
                      <Text>{dataTiketMulti.status} gada</Text>
                    ))
                  } */}
                  {/* //contoh bikin signature  dtaro  sini */}
                  {/* //contoh image slider view */}
                  {/* <View style={{marginTop: 50}}>
                    <Text style={{fontWeight: 'bold'}}>Finish of Services</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <ScrollView horizontal>
                      {imagesDummy.map((item, key) => {
                        return (
                          <TouchableOpacity
                            key={key}
                            //   style={{flex: 1}}
                            activeOpacity={1}
                            onPress={() =>
                              navigation.navigate('PreviewImage', {
                                images: imagesDummy,
                              })
                            }>
                            <Image
                              key={key}
                              style={{width: 100, height: 100}}
                              source={item.image}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View> */}
                  {/* //contoh image slider view */}
                </View>
              )}
            </ScrollView>

            <ScrollView>
              {selectedIndex === 1 && (
                <View>
                  {dataTiketMulti.status != 'R' ? (
                    <View style={{marginHorizontal: 10, marginTop: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={widthStyle}>
                          <Text>Assign To</Text>
                        </View>
                        <View style={{width: 10}}>
                          <Text>:</Text>
                        </View>
                        <View>
                          <Text style={{flexWrap: 'wrap'}}>
                            {dataTiketMulti.assign_to}
                          </Text>
                        </View>
                      </View>
                      <View style={{marginTop: 10}}>
                        <View>
                          <Text>Problem Cause</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                          <View
                            style={{
                              width: '100%',
                              height: 'auto',
                              borderColor: '#555',
                              borderRadius: 10,
                              borderWidth: 1,
                              padding: 5,
                            }}>
                            <Text style={{width: '100%'}}>
                              {dataTiketMulti.problem_cause}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {dataAction.map((data, index) => {
                        <View key={index} style={{marginVertical: 5}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={widthStyle}>
                              <Text>Action By</Text>
                            </View>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                            <View>
                              <Text>{data.action_by}</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={widthStyle}>
                              <Text>Action Taken</Text>
                            </View>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                            <View>
                              <Text>{data.action_taken}</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={widthStyle}>
                              <Text>Action Date</Text>
                            </View>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                            <View>
                              <Text>{data.action_date}</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={widthStyle}>
                              <Text>Action Date</Text>
                            </View>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                            <View>
                              <Text>{data.action_date}</Text>
                            </View>
                          </View>
                        </View>;
                      })}
                      {/* <TouchableOpacity
                        //   style={btnConfirm}
                        onPress={() => saveConfirm()}>
                        <Text>Confirm</Text>
                      </TouchableOpacity> */}
                    </View>
                  ) : (
                    <View>
                      <Text>No Feedback</Text>
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View>
            <Text>no data</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
