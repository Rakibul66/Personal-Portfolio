# 🧠 Power Quiz | Advanced SwiftUI Portfolio Project

[![Swift Version](https://img.shields.io/badge/Swift-6.0-orange.svg)](https://swift.org)
[![Platform](https://img.shields.io/badge/Platform-iOS%2017%2B-blue.svg)](https://apple.com)
[![Architecture](https://img.shields.io/badge/Architecture-MVVM-green.svg)](#)

A high-performance, premium Trivia application built with **SwiftUI**. This project serves as a showcase for modern iOS navigation patterns, reactive UI design, and robust API integration.

---

## 📽️ Project Showcase

<div align="center">
  <img src="https://via.placeholder.com/200x430?text=Home+View" width="30%" />
  <img src="https://via.placeholder.com/200x430?text=Setup+View" width="30%" />
  <img src="https://via.placeholder.com/200x430?text=Quiz+View" width="30%" />
</div>

---

## 🎯 Engineering Objectives
The primary goal of this project was to move beyond basic SwiftUI tutorials and implement production-level patterns in a "pet project" environment:

* **State-Driven Navigation:** Decoupling view transitions from the View layer using a centralized `NavigationPath`.
* **Performance Grids:** Utilizing `LazyVGrid` and asynchronous image loading for a buttery-smooth 60FPS browsing experience.
* **User-Centric Configuration:** Implementing a friction-less "Setup" flow with haptic feedback and custom steppers.

---

## 🚀 Key Technical Implementation

### 1. Robust Navigation Architecture
One of the most significant challenges solved was the **"Pop-to-Root"** requirement. Standard dismissal methods in SwiftUI can lead to nested state issues. 

**The Solution:**
I implemented an `AppRoute` enum and a shared `NavigationPath` binding. This allows the app to perform a total stack reset from the **ResultsView** back to **Home** with a single line of code:
```swift
path = NavigationPath() // Instantly clears the stack
