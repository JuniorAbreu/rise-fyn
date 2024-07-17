import { SafeAreaView, View, Text } from "react-native";
import { Header } from "../../components/header";
import { Dimensions } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import { useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { useState } from "react/cjs/react.development";

export function Dashboard() {
    const isFocused = useIsFocused();
    const [transactions, setTransactions] = useState([]);
    const [startDate, setStartDate] = useState(new Date(), -6);
    const [endDate, setEndDate] = useState(new Date());

    const balance = 15000;
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    function buildSeries() {
      const income = [];
      const expense = [];
      transactions.forEach((t) => {
        if (t.date >= startDate && t.date <= endDate) {
          if (t.type === 'receita') {
            income.push(t.value);
          } else  {
            expense.push(t.value);
          }
        }
      })
      return series;
    }

    let option = {
        // title: {
        //     text: 'Resumo do fluxo'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        legend: {
          data: ['Saídas', 'Entradas', 'Saldo final']
        },
        xAxis: [
          {
            type: 'category',
            data: months.slice(0, 6),
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Entradas',
            min: 0,
            max: 250,
            interval: 50,
          },
          {
            type: 'value',
            name: 'Saldo final',
            min: 0,
            max: 25,
            interval: 5,
          }
        ],
        series: [
          {
            name: 'Saídas',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7
            ],
            color: 'rgb(252, 165, 165)'
          },
          {
            name: 'Entradas',
            type: 'bar',
            color: 'rgb(163, 230, 53)',
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7
            ]
          },
          {
            name: 'Saldo final',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              },
            },
            label: {
                show: true,
                position: 'top'
            },
            color: 'rgb(250, 204, 21)',
            data: [balance, 2.2, 3.3, 4.5, 6.3, 10.2]
          }
        ]
    };
      async function loadTransactions() {
        const data = await getItem('@transaction').catch( error => console.error(error));
        setTransactions(data);
      }
      useEffect(() => {
        loadTransactions();
    }, [isFocused]);
    return (
       <SafeAreaView className='flex-1 h-full'>
            <Header title={'Dashboard'}/>
            <View className='overflow-auto flex-1 top-3 items-center'>
                <View className='h-2/4 bg-white p-4 bg-red w-11/12 rounded-lg'>
                    <ECharts
                    option={option}
                    backgroundColor="white"
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

