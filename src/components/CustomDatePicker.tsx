// components/CustomDatePicker.tsx
// Publish as npm package later

import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";
import Text from "elements/Text";

type CustomDatePickerProps = {
  /** ISO string or empty */
  value: string;
  /** Called with the new ISO string */
  onChange: (iso: string) => void;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45]; // Common time intervals
const ITEM_HEIGHT = 44;
const DAYS_TO_SHOW = 7; // Number of days to show in the carousel

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
}) => {
  const initial = value ? new Date(value) : new Date();
  const [date, setDate] = useState(initial);

  // Generate array of days starting from today (no past dates)
  const generateDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < DAYS_TO_SHOW; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const [days, setDays] = useState(generateDays());

  // keep parent in sync
  useEffect(() => {
    onChange(date.toISOString());
  }, [date, onChange]);

  // Refresh days when we reach near the end of current days array
  useEffect(() => {
    const selectedDayIndex = days.findIndex(
      (d) =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
    );

    // If selected date is in the last 2 days of current array, generate more days
    if (selectedDayIndex >= DAYS_TO_SHOW - 2) {
      const lastDay = days[days.length - 1];
      const newDays = [...days];

      // Add more days to the end
      for (let i = 1; i <= 3; i++) {
        const newDay = new Date(lastDay);
        newDay.setDate(lastDay.getDate() + i);
        newDays.push(newDay);
      }

      setDays(newDays);
    }
  }, [date]);

  /* ---------- DATE ---------- */
  const selectDay = (selectedDate: Date) => {
    const nd = new Date(date);
    nd.setFullYear(selectedDate.getFullYear());
    nd.setMonth(selectedDate.getMonth());
    nd.setDate(selectedDate.getDate());
    setDate(nd);
  };

  const navigateDays = (direction: "next") => {
    const newDays = days.map((day) => {
      const newDay = new Date(day);
      newDay.setDate(day.getDate() + DAYS_TO_SHOW);
      return newDay;
    });
    setDays(newDays);
  };

  /* ---------- TIME ---------- */
  const setTime = (hours: number, minutes: number) => {
    const nd = new Date(date);
    nd.setHours(hours, minutes, 0, 0);
    setDate(nd);
  };

  /* ---------- SCROLL REFS ---------- */
  const dayScroll = useRef<ScrollView>(null);
  const timeScroll = useRef<ScrollView>(null);

  // Scroll to current selections - but only if they're not already in view
  useEffect(() => {
    const scrollToSelectedDay = () => {
      const selectedDayIndex = days.findIndex(
        (d) =>
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
      );

      if (selectedDayIndex !== -1 && dayScroll.current) {
        // Use setTimeout to ensure the scroll happens after state update
        setTimeout(() => {
          dayScroll.current?.scrollTo({
            x: selectedDayIndex * 78, // Approximate day item width
            animated: true,
          });
        }, 100);
      }
    };

    scrollToSelectedDay();
  }, [date, days]);

  const formatDay = (day: Date) => {
    const today = new Date();
    const isToday =
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();

    return {
      day: day.getDate(),
      month: day.toLocaleDateString("en", { month: "short" }),
      weekday: day.toLocaleDateString("en", { weekday: "short" }),
      isToday,
    };
  };

  const formatTime = (hours: number, minutes: number) => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of MINUTES) {
        slots.push({ hour, minute });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const onTimeScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / 100); // Approximate item width
    const slot = timeSlots[index];
    if (slot) {
      // setTime(slot.hour, slot.minute);
    }
  };

  const scrollToSelectedTime = () => {
    const selectedIndex = timeSlots.findIndex(
      (slot) =>
        slot.hour === date.getHours() && slot.minute === date.getMinutes()
    );

    if (selectedIndex !== -1 && timeScroll.current) {
      setTimeout(() => {
        timeScroll.current?.scrollTo({
          x: selectedIndex * 100, // Approximate item width
          animated: true,
        });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToSelectedTime();
  }, [date]);

  return (
    <View style={styles.wrapper}>
      {/* ---------- DAY CAROUSEL ---------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Day</Text>
        <View style={styles.dayCarousel}>
          <ScrollView
            ref={dayScroll}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}
            snapToInterval={78} // Approximate day item width
            decelerationRate="fast"
          >
            {days.map((day, index) => {
              const formatted = formatDay(day);
              const isSelected =
                day.getDate() === date.getDate() &&
                day.getMonth() === date.getMonth() &&
                day.getFullYear() === date.getFullYear();

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayItem,
                    isSelected && styles.dayItemSelected,
                    formatted.isToday && styles.todayItem,
                  ]}
                  onPress={() => selectDay(day)}
                >
                  <Text
                    style={[
                      styles.weekdayText,
                      isSelected && styles.dayTextSelected,
                      formatted.isToday && styles.todayText,
                    ]}
                  >
                    {formatted.weekday}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.dayTextSelected,
                      formatted.isToday && styles.todayText,
                    ]}
                  >
                    {formatted.day}
                  </Text>
                  <Text
                    style={[
                      styles.monthText,
                      isSelected && styles.dayTextSelected,
                      formatted.isToday && styles.todayText,
                    ]}
                  >
                    {formatted.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            onPress={() => navigateDays("next")}
            style={styles.arrow}
          >
            <Ionicons name="chevron-forward" size={24} color={COLORS.light} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------- TIME PICKER ---------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time</Text>
        <ScrollView
          ref={timeScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.timesContainer}
          snapToInterval={100} // Approximate time item width
          decelerationRate="fast"
          onMomentumScrollEnd={onTimeScrollEnd}
        >
          {timeSlots.map((slot, index) => {
            const timeString = formatTime(slot.hour, slot.minute);
            const isSelected =
              slot.hour === date.getHours() &&
              slot.minute === date.getMinutes();

            return (
              <TouchableOpacity
                key={index}
                style={[styles.timeItem, isSelected && styles.timeItemSelected]}
                onPress={() => setTime(slot.hour, slot.minute)}
              >
                <Text
                  style={[
                    styles.timeText,
                    isSelected && styles.timeTextSelected,
                  ]}
                >
                  {timeString}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

/* --------------------------------------------------------------- */
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.lightGray,
    fontSize: 13,
    marginBottom: 10,
    fontWeight: "500",
  },

  /* DAY CAROUSEL */
  dayCarousel: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    padding: 8,
    marginLeft: 4,
  },
  daysContainer: {
    flexGrow: 1,
    paddingHorizontal: 4,
  },
  dayItem: {
    width: 70,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: COLORS.dark,
  },
  dayItemSelected: {
    backgroundColor: COLORS.primary,
  },
  todayItem: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  weekdayText: {
    color: COLORS.lightGray,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  dayNumber: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  monthText: {
    color: COLORS.lightGray,
    fontSize: 11,
  },
  dayTextSelected: {
    color: COLORS.white,
  },
  todayText: {
    // color: COLORS.primary,
  },

  /* TIME CAROUSEL */
  timesContainer: {
    paddingHorizontal: 4,
  },
  timeItem: {
    width: 92,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: COLORS.dark,
  },
  timeItemSelected: {
    backgroundColor: COLORS.primary,
  },
  timeText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "500",
  },
  timeTextSelected: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
