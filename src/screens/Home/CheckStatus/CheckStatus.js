import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import APICall from '@/src/utils/APICall';

export default function CheckStatus() {
    const APIURL = "https://androidapi220230605081325.azurewebsites.net/api/approval/GetTickets?PlantName=Plant1";

    const [complaintData, setComplaintData] = useState([]);
    const [loading, setLoading] = useState(true);

    const report = (data, error) => {
        if (error === "error") {
            console.log("Internal Server Error");
        } else {
            console.log("API Response: ", data);
            setComplaintData(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        APICall(APIURL, null, report, "getResponse");
    }, []);

    const formatDate = (createdDtTm) => {
        if (!createdDtTm) return "No Date";
        return createdDtTm.slice(0, 10);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "Open":
                return {
                    backgroundColor: "#FFFCE6",
                    borderColor: "#DCC31C",
                    color: "#DCC31C",
                };
            case "Work Done":
                return {
                    backgroundColor: "#EFFFF7",
                    borderColor: "#19C770",
                    color: "#19C770",
                };
            case "On Hold":
                return {
                    backgroundColor: "#FFE8E7",
                    borderColor: "#C6241F",
                    color: "#C6241F",
                };
            default:
                return {
                    backgroundColor: "#D9D9D9",
                    borderColor: "#B0B0B0",
                    color: "#777",
                };
        }
    };

    const renderItem = ({ item }) => {
        const statusStyles = getStatusStyles(item.ticketStatus);

        return (
            <View style={styles.complaintItem}>
                <View style={styles.textContainer}>
                    <View
                        style={{
                            flexDirection: "row",
                            width: "99%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottomWidth: 1,
                            paddingBottom: 7,
                            borderBottomColor: "#9D9494",
                            borderStyle: "dashed",
                        }}
                    >
                        <Text style={{ color: "#777777", fontWeight: "500", fontSize: 12 }}>
                            Ticket No. CN1001
                        </Text>
                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor: statusStyles.backgroundColor,
                                    borderColor: statusStyles.borderColor,
                                    borderWidth: 1,
                                },
                            ]}
                        >
                            <Text style={[styles.statusText, { color: statusStyles.color }]}>
                                {item.ticketStatus || "No Status"}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{item.title || "No Title"}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            width: "99%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.category}>
                            {formatDate(item.category) || "No Category"}
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Image
                                source={require("../../../assets/icons/Cal.png")}
                                style={{ width: 22, height: 22 }}
                            />
                            <Text style={styles.date}>
                                {formatDate(item.createdDtTm) || "No Date"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image
                        source={require('../../../assets/icons/LeftArrow.png')}
                        style={{ width: 20, height: 30 }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Check Status</Text>
            </View>

            {/* Loading Indicator */}
            {loading ? (
                <ActivityIndicator size="large" color="#D32F2F" style={{ marginTop: 20 }} />
            ) : (
                /* Complaint List */
                <FlatList
                    data={complaintData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D32F2F",
        padding: 15,
        marginBottom: 10,
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    complaintItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F2F5FA",
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        paddingTop: 7,
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    category: {
        fontWeight: "500",
        color: "#777777",
        marginTop: 2,
        fontSize: 12,
    },
    date: {
        color: "#777777",
        marginTop: 2,
        fontSize: 12,
        fontWeight: "500",
    },
    statusBadge: {
        width: 100,
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    statusText: {
        fontWeight: "bold",
        fontSize: 12,
    },
});
