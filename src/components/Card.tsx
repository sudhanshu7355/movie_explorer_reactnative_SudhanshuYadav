import { Alert, Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetsubscriptionStatus } from '../axiosRequest/Axiosrequest';
import { useSelector } from 'react-redux';

const Card = ({ data }: any) => {
    const [openModal, setOpenModal] = useState(false);
    const [PlanStatus, setPlanStatus] = useState('');
    const userToken = useSelector((state) => state.user.token);

    useEffect(() => {
        const getSubscriptionStatus = async () => {
            const res = await GetsubscriptionStatus(userToken);
            setPlanStatus(res.plan_type || 'No Active Plan');
        };
        getSubscriptionStatus();
    }, [userToken]);
    if (!data) {
        return <View style={styles.container}><Text>No data available</Text></View>;
    }
    const handleOpenModal = () => {
        if (data.is_premium && PlanStatus === 'basic') {
            Alert.alert('this is premium movie')
        } else {
            setOpenModal(!openModal)
        }
    }

    console.log(PlanStatus);

    return (
        <View>
            <TouchableOpacity onPress={() => handleOpenModal()}>
                <View style={styles.container}>
                    {data.poster_url ? (
                        <ImageBackground
                            style={styles.posterImage}
                            source={{ uri: data.poster_url }}
                            resizeMode="cover"
                        >
                            {data.is_premium && <Image source={require('../assets/icons/crown.png')} style={{ height: 30, width: 30 }} />}
                        </ImageBackground>
                    ) : (
                        <View style={styles.noImagePlaceholder}>
                            <Text>No image</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}>

                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ImageBackground
                            blurRadius={5}
                            source={{ uri: data.poster_url }}
                            style={styles.backdropImage}>

                            <View style={styles.closeButtonContainer}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setOpenModal(false)}>

                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.posterContainer}>
                                <Image
                                    source={{ uri: data.poster_url }}
                                    style={styles.modalPosterImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </ImageBackground>

                        <View style={styles.movieDescription}>
                            <View style={styles.movieTitleContainer}>
                                <Text style={styles.movieTitle}>{data.title}</Text>

                                <View style={styles.genreContainer}>
                                    {data.genre && (
                                        <View style={styles.genreBadge}>
                                            <Text style={styles.genreText}>{data.genre}</Text>
                                        </View>
                                    )}
                                </View>


                            </View>

                            <View style={styles.ratingYearContainer}>
                                {data.rating && (
                                    <View style={styles.ratingContainer}>
                                        <Text>⭐️</Text>
                                        <Text style={styles.ratingText}>{data.rating}</Text>
                                    </View>
                                )}

                                {data.release_year && (
                                    <Text style={styles.yearText}>{data.release_year}</Text>
                                )}
                            </View>

                            {data.description && (
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.descriptionText}>{data.description}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 130,
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    posterImage: {
        height: '100%',
        width: '100%',
    },
    noImagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flex: 1,
    },
    backdropImage: {
        width: '100%',
        height: '50%',
    },
    closeButtonContainer: {
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        lineHeight:16,
        fontWeight: 'bold',
    },
    posterContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalPosterImage: {
        width: '80%',
        height: 300,
        borderRadius: 10,
    },
    movieDescription: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    movieTitleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    movieTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    genreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    genreBadge: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        padding: 5,
        margin: 5,
    },
    genreText: {
        color: 'white',
    },
    ratingYearContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: 'white',
        marginLeft: 5,
    },
    yearText: {
        color: 'white',
        fontWeight: '600',
    },
    descriptionContainer: {
        marginTop: 10,
    },
    descriptionText: {
        color: 'white',
        lineHeight: 20,
    },
});

export default Card;