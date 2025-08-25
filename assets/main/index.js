System.register("chunks:///_virtual/Car.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, js, _decorator, randomRangeInt, Input, Sprite, BoxCollider2D, RigidBody2D, ProgressBar, lerp, Vec2, tween, UIOpacity, Component, GameManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      js = module.js;
      _decorator = module._decorator;
      randomRangeInt = module.randomRangeInt;
      Input = module.Input;
      Sprite = module.Sprite;
      BoxCollider2D = module.BoxCollider2D;
      RigidBody2D = module.RigidBody2D;
      ProgressBar = module.ProgressBar;
      lerp = module.lerp;
      Vec2 = module.Vec2;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ac604KdUDdKOZQQpWebJt7+", "Car", undefined);
      var IDGenerator = js.IDGenerator;
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CarState = exports('CarState', /*#__PURE__*/function (CarState) {
        CarState[CarState["UNDEFINED"] = -1] = "UNDEFINED";
        CarState[CarState["MOVE_IN"] = 0] = "MOVE_IN";
        CarState[CarState["PARKING"] = 1] = "PARKING";
        CarState[CarState["PARKED"] = 2] = "PARKED";
        CarState[CarState["MOVE_OUT"] = 3] = "MOVE_OUT";
        return CarState;
      }({}));
      var Car = exports('Car', (_dec = ccclass('Car'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Car, _Component);
        function Car() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.sprCar = void 0;
          _this.sprCheck = void 0;
          _this.pbTimer = void 0;
          _this.path = void 0;
          _this.speed = void 0;
          _this.angle = void 0;
          _this._isReverse = false;
          _this._isParked = false;
          _this._isDriverInside = true;
          _this._isGettingOut = false;
          _this._isOut = false;
          _this._isStart = true;
          _this._carId = void 0;
          _this.boxCollider = void 0;
          _this.rigidBody = void 0;
          _this._lastTimeTurnAround = 0;
          _this._state = CarState.UNDEFINED;
          _this._timeParking = void 0;
          return _this;
        }
        var _proto = Car.prototype;
        _proto.onLoad = function onLoad() {
          this.angle = randomRangeInt(0, 359);
          this.speed = randomRangeInt(50, 300);
          console.log("Car::onLoad", this.angle);
          this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
          this.sprCar = this.node.getChildByName("sprCar").getComponent(Sprite);
          this.path = GameManager.getInstance().getPathManager().getPath();
          this._carId = IDGenerator.global.getNewId();
          this.boxCollider = this.node.getComponent(BoxCollider2D);
          this.rigidBody = this.node.getComponent(RigidBody2D);
          this._timeParking = randomRangeInt(5000, 10000);
          this.pbTimer = this.node.getChildByName("pbTimer").getComponent(ProgressBar);
          this.sprCheck = this.node.getChildByName("sprCheck").getComponent(Sprite);
          this.sprCheck.node.active = false;
          this.pbTimer.node.active = false;
          this.pbTimer.progress = 0;
          // this.rigidBody.gravityScale = 0;
        };

        _proto.getCarId = function getCarId() {
          return this._carId;
        };
        _proto.getPath = function getPath() {
          return this.path;
        };
        _proto.onTouchStart = function onTouchStart(event) {
          if (this._state === CarState.PARKING) {
            return;
          }
          if (!this._isDriverInside) {
            return;
          }
          if (this._isParked) {
            this._isGettingOut = true;
            this.path.setIsGettingOut(this._isGettingOut);
          }
          var target = event.target;
          var startPos = event.getUILocation();
          this.path.onTouchStart(event);
          // this.path.length = 0;
          // console.log("Start pos: ", startPos);
          // this.path.push(startPos);
          // this.graphics.clear();
          // this.graphics.strokeColor = Color.WHITE;
          // this.graphics.lineWidth = 5;
          // this.graphics.moveTo(startPos.x - this.node.x, startPos.y - this.node.y - this.node.getComponent(UITransform).height / 2);
        };

        _proto.onTouchMove = function onTouchMove(event) {
          this.path.onTouchMove(event);
          // const minDelta = 5;
          // let lastPath = this.path[this.path.length - 1];
          // let currentPos = event.getUILocation();
          // if (Math.abs(currentPos.x - lastPath.x) > minDelta || Math.abs(currentPos.y - lastPath.y) > minDelta) {

          //     console.log("Move pos: ", currentPos);
          //     this.path.push(currentPos);
          //     this.graphics.lineTo(currentPos.x - this.node.x, currentPos.y - this.node.y - this.node.getComponent(UITransform).height / 2);
          // }
          // this.graphics.stroke();
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          this.path.onTouchEnd(event);
          // console.log("End pos: ", event.getUILocation());
          // this.path.push(event.getUILocation());
          // console.log("Current path: ", this.path);
        };

        _proto.onTouchCancel = function onTouchCancel(event) {
          this.path.onTouchCancel(event);
          // console.log("Cancel pos: ", event.getUILocation());
          // console.log("Current path: ", this.path);
        };

        _proto.start = function start() {};
        _proto.setIsParked = function setIsParked(isParked) {
          this._isParked = isParked;
        };
        _proto.update = function update(deltaTime) {
          if (!this._isStart) {
            return;
          }
          if (this._isParked && !this._isGettingOut) {
            // dang dau xe
            return;
          }
          if (this._isOut) {
            return;
          }
          if (this.path.getPositions().length === 0) {
            this.moveWithCurrentAngle(deltaTime);
            return;
          } else {
            this.moveWithPath(deltaTime);
          }
        };
        _proto.checkTurnAround = function checkTurnAround() {
          var currentTime = new Date().getTime();
          if (currentTime - this._lastTimeTurnAround > 1500) {
            this._lastTimeTurnAround = currentTime;
            this.angle = this.angle < 180 ? this.angle + 180 : this.angle - 180;
          }
        };
        _proto.moveWithCurrentAngle = function moveWithCurrentAngle(deltaTime) {
          if (this._isReverse) {
            this._isReverse = false;
            this.sprCar.node.angle = 0;
            this.angle = (this.angle + 180) % 360;
          }
          var s = deltaTime * this.getSpeed();
          this.node.x = this.node.x + Math.sin(-this.angle / 180 * Math.PI) * s;
          this.node.y = this.node.y + Math.cos(-this.angle / 180 * Math.PI) * s;
          var deltaY = 200 / 2;
          var deltaX = 200 / 2;
          if (this.node.x < deltaX || this.node.x > 1280 - deltaX || this.node.y < deltaY || this.node.y > 720 - deltaY) {
            // this.angle = this.angle < 180?this.angle + 180:this.angle -180;
            this.checkTurnAround();
          }
          // this.node.angle = lerp(this.node.angle,this.angle,0.8);
          this.rigidBody.node.angle = lerp(this.rigidBody.node.angle, this.angle, 1);
          // this.node.angle = this.angle;
          // console.log("Hittt: ", this.node.angle - this.angle,this.node.angle, this.angle);
        }

        // moveWithPath(deltaTime: number) {
        //     let s = deltaTime * this.getSpeed();
        //     let move = 0;
        //     let moveIndex = -1;
        //     let positions = this.path.getPositions();
        //     while (move < s) {
        //         if (moveIndex < positions.length - 1) {
        //             moveIndex++;
        //             if (moveIndex === 0) {
        //                 move += Vec2.distance(this.node.position.toVec2(), positions[moveIndex]);
        //             } else {
        //                 move += Vec2.distance(positions[moveIndex], positions[moveIndex-1]);
        //             }
        //         }
        //         else {
        //             break;
        //         }
        //     }
        //     console.log("Move to: ", moveIndex, positions[moveIndex], positions);
        //     console.log("Move: ", move, "S: ", s);
        //     let moveVector = new Vec2(positions[moveIndex].x - this.node.position.x, positions[moveIndex].y - this.node.position.y);
        //     this.angle = Math.atan(moveVector.y/moveVector.x) * 180 / Math.PI - 90 + (moveVector.x <0?-180:0);

        //     this.node.x = positions[moveIndex].x;
        //     this.node.y = positions[moveIndex].y;
        //     this.sprCar.node.angle = lerp(this.sprCar.node.angle,this.angle,0.4);
        //     let target = new Vec2()
        //     if (s < move) {
        //         console.log("Move: ", move, "S: ", s, "moveIndex: ", moveIndex);
        //         this.path.slicePositions(moveIndex+1);
        //     } else {

        //     }
        // }
        ;

        _proto.getSpeed = function getSpeed() {
          if (this._isReverse) {
            return this.speed / 2;
          }
          return this.speed;
        };
        _proto.moveWithPath = function moveWithPath(deltaTime) {
          var s = deltaTime * this.getSpeed();
          var move = 0;
          var moveIndex = -1;
          var positions = this.path.getPositions();
          while (move < s) {
            if (moveIndex < positions.length - 1) {
              moveIndex++;
              if (moveIndex === 0) {
                move += Vec2.distance(this.node.position.toVec2(), positions[moveIndex]);
              } else {
                move += Vec2.distance(positions[moveIndex], positions[moveIndex - 1]);
              }
            } else {
              break;
            }
          }
          var targetPos = new Vec2(positions[moveIndex].x, positions[moveIndex].y);
          var moveVector = new Vec2(positions[moveIndex].x - this.node.position.x, positions[moveIndex].y - this.node.position.y);
          var targetAngle = Math.atan(moveVector.y / moveVector.x) * 180 / Math.PI - 90 + (moveVector.x < 0 ? -180 : 0);
          if (s < move) {
            // di chuyen 1 phan tren path di toi moveIndex
            var retainPath = move - s;
            var lastPathLength = 0;
            var lastPos = this.node.position.toVec2();
            if (moveIndex === 0) {
              lastPathLength = Vec2.distance(positions[moveIndex], lastPos);
            } else {
              lastPos = positions[moveIndex - 1];
              lastPathLength = Vec2.distance(positions[moveIndex], lastPos);
            }
            if (lastPathLength === 0) {
              // targetPos = lastPos; // todo check
              targetPos = positions[moveIndex];
            } else {
              var rate = (lastPathLength - retainPath) / lastPathLength;
              targetPos.x = lastPos.x + (positions[moveIndex].x - lastPos.x) * rate;
              targetPos.y = lastPos.y + (positions[moveIndex].y - lastPos.y) * rate;
            }
            moveVector = new Vec2(positions[moveIndex].x - lastPos.x, positions[moveIndex].y - lastPos.y);
            targetAngle = (Math.atan(moveVector.y / moveVector.x) * 180 / Math.PI - 90 + (moveVector.x < 0 ? -180 : 0)) % 360;
            // targetAngle = Math.atan(moveVector.y/moveVector.x) * 180 / Math.PI - 90; 
            if (Math.abs(targetAngle - this.angle) > 150 && Math.abs(targetAngle - this.angle) < 300) {
              console.log("EEEEEE", Math.abs(targetAngle - this.angle) % 360);
              this._isReverse = !this._isReverse;
              this.sprCar.node.angle = this._isReverse ? 180 : 0;
            }
            this.path.slicePositions(moveIndex);
          } else {
            // di chuyen het path
            moveVector = new Vec2(positions[moveIndex].x - this.node.position.x, positions[moveIndex].y - this.node.position.y);
            this.path.slicePositions(positions.length);
            this.onFinishPath();
          }

          // final move
          this.angle = targetAngle;
          this.node.x = targetPos.x;
          this.node.y = targetPos.y;
          this.rigidBody.angularVelocity = 0;
          this.rigidBody.angularDamping = 0;
          this.node.angle = lerp(this.node.angle, this.angle, 1);
          // this.node.angle = this.angle;
          // console.log("Hi: ", this.node.angle - this.angle,this.node.angle, this.angle);
        };

        _proto.doParking = function doParking() {
          var _this2 = this;
          this._state = CarState.PARKING;
          this._isParked = true;
          this.pbTimer.node.active = true;
          console.log("Do parking: ", this._timeParking);
          tween(this.pbTimer).to(this._timeParking / 1000, {
            progress: 1
          }).call(function () {
            _this2.onFinishParking();
          }).start();
        };
        _proto.onFinishParking = function onFinishParking() {
          console.log("onFinishParking");
          this._state = CarState.PARKED;
          this._isParked = true;
          this.sprCheck.node.active = true;
          this.pbTimer.node.active = false;
        };
        _proto.onFinishPath = function onFinishPath() {
          if (this.path.isMatchPark()) {
            this.doParking();
          }
          if (this.path.isMatchOut()) {
            this.moveOut();
          }
          this.path.reset();
        };
        _proto.moveOut = function moveOut() {
          var _this3 = this;
          this._isOut = true;
          GameManager.getInstance().incScore();
          tween(this.node.getComponent(UIOpacity)).to(0.3, {
            opacity: 0
          }).call(function () {
            _this3.onFinishMoveOut();
          }).start();
        };
        _proto.onFinishMoveOut = function onFinishMoveOut() {
          this.node.active = false;
          this.node.removeFromParent();
          GameManager.getInstance().getCarManager().pushToPool(this);
        };
        _proto.reset = function reset() {
          this.node.active = true;
          this.node.getComponent(UIOpacity).opacity = 255;
          this._isOut = false;
          this._isParked = false;
          this._isDriverInside = true;
          this._isGettingOut = false;
        };
        _proto.readyToStart = function readyToStart() {
          var _this4 = this;
          this._isStart = false;
          // this.rigidBody.enabledContactListener = false;
          this.rigidBody.enabled = false;
          this.node.getComponent(UIOpacity).opacity = 200;
          tween(this.node.getComponent(UIOpacity)).to(0.4, {
            opacity: 100
          }).to(0.4, {
            opacity: 200
          }).to(0.4, {
            opacity: 100
          }).to(0.4, {
            opacity: 200
          }).to(0.4, {
            opacity: 100
          }).call(function () {
            _this4._isStart = true;
            _this4.rigidBody.enabled = true;
            _this4.ignoreCollider(2);
          })
          // .to(0.5, {opacity: 200})
          // .to(0.5, {opacity: 100})
          // .to(0.5, {opacity: 200})
          // .to(0.5, {opacity: 255})
          // .call(() => {
          //     // this.rigidBody.enabledContactListener = true;
          // })
          .start();
        };
        _proto.ignoreCollider = function ignoreCollider(timeOut) {
          var _this5 = this;
          if (timeOut === void 0) {
            timeOut = 3;
          }
          this.rigidBody.enabledContactListener = false;
          tween(this.node.getComponent(UIOpacity)).to(timeOut / 4, {
            opacity: 100
          }).to(timeOut / 4, {
            opacity: 200
          }).to(timeOut / 8, {
            opacity: 100
          }).to(timeOut / 8, {
            opacity: 200
          }).to(timeOut / 8, {
            opacity: 100
          }).to(timeOut / 8, {
            opacity: 255
          }).call(function () {
            _this5.rigidBody.enabledContactListener = true;
          }).start();
        };
        return Car;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CarManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './Car.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, resources, instantiate, Vec3, randomRangeInt, Component, GameManager, Car;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      randomRangeInt = module.randomRangeInt;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      Car = module.Car;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "bdc76E2bGNGC7IZS8WqIwWN", "CarManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CarManager = exports('CarManager', (_dec = ccclass('CarManager'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CarManager, _Component);
        function CarManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.prefabCar = null;
          _this.cars = [];
          _this.pool = [];
          _this.numCarsGen = 3;
          _this.timeGen = 0;
          return _this;
        }
        var _proto = CarManager.prototype;
        _proto.onLoad = function onLoad() {
          GameManager.getInstance().setCarManager(this);
          this.loadResources();
        };
        _proto.loadResources = function loadResources() {
          var _this2 = this;
          resources.load("prefabs/PrefabCar", function (err, data) {
            _this2.prefabCar = data;
            _this2.onFinishLoadResources();
          });
        };
        _proto.getCars = function getCars() {
          return this.cars;
        };
        _proto.initSomeCar = function initSomeCar() {
          // for (let i = 0; i < 4; ++i) {
          //     let carComp = this.getNewCar();
          //     carComp.reset();
          //     let nodeCar = carComp.node;
          //     this.node.addChild(nodeCar);
          //     nodeCar.position = new Vec3(randomRangeInt(50,1000), randomRangeInt(50, 600), 0);
          //     this.cars.push(nodeCar.getComponent(Car));
          // }
          this.genNewWave();
        };
        _proto.onFinishLoadResources = function onFinishLoadResources() {
          this.initSomeCar();
        };
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        _proto.pushToPool = function pushToPool(car) {
          this.cars = this.cars.filter(function (car) {
            return car.getCarId() === car.getCarId();
          });
          this.pool.push(car);
        };
        _proto.getNewCar = function getNewCar() {
          // if (this.pool.length > 0) {
          //     return this.pool.pop();
          // }
          return instantiate(this.prefabCar).getComponent(Car);
        };
        _proto.genNewWave = function genNewWave() {
          var _this3 = this;
          console.log("Gen new wave");
          var summonPos = [new Vec3(1130, 320, 0), new Vec3(1130, 480, 0), new Vec3(1130, 480, 0)];
          var _loop = function _loop() {
            var car = _this3.getNewCar();
            car.reset();
            car.node.position = summonPos[randomRangeInt(0, 3)];
            car.node.angle = 90;
            setTimeout(function () {
              _this3.node.addChild(car.node);
              car.readyToStart();
              _this3.cars.push(car);
            }, randomRangeInt(1000, 12000));
          };
          for (var i = 0; i < this.numCarsGen; ++i) {
            _loop();
          }
          this.timeGen++;
          if (this.timeGen % 4 == 0) {
            this.numCarsGen++;
          }
          this.timeOutGenNewWave();
        };
        _proto.timeOutGenNewWave = function timeOutGenNewWave() {
          var _this4 = this;
          setTimeout(function () {
            _this4.genNewWave();
          }, randomRangeInt(24000, 35000));
        };
        return CarManager;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['cc', './Car.ts'], function (exports) {
  var cclegacy, _decorator, director, Vec2, PhysicsSystem2D, Contact2DType, Car;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Vec2 = module.Vec2;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Contact2DType = module.Contact2DType;
    }, function (module) {
      Car = module.Car;
    }],
    execute: function () {
      cclegacy._RF.push({}, "98a61/kBkhIx6OCjAMltUol", "GameManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameManager = exports('GameManager', /*#__PURE__*/function () {
        GameManager.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new GameManager();
          }
          return this._instance;
        }

        /**
         *
         */;
        function GameManager() {
          this.parkingLotManager = void 0;
          this.pathManager = void 0;
          this.carManager = void 0;
          this.gameTime = 0;
          this.gameTick = 0;
          this.score = 0;
          this.life = 3;
          this.sceneGame = void 0;
          var physic_manager = PhysicsSystem2D.instance;
          physic_manager.enable = true;
          physic_manager.fixedTimeStep = 1 / 60;
          physic_manager.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          physic_manager.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        var _proto = GameManager.prototype;
        _proto.subLife = function subLife() {
          console.log("subLife");
          this.life--;
          this.sceneGame.setLife(this.life);
          if (this.life == 0) {
            console.log("End game");
            this.endGame();
          }
        };
        _proto.endGame = function endGame() {
          director.pause();
          this.sceneGame.showGameOver(this.score);
        };
        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          // if (!otherCollider.node.getComponent(RigidBody2D).enabledContactListener) {
          //     alert("Touchaz");
          //     return;
          // }
          var x,
            y = 0;
          var nodeCar = selfCollider.node.getComponent(Car);
          var nodeOtherCar = otherCollider.node.getComponent(Car);
          nodeCar && nodeCar.ignoreCollider(3);
          nodeOtherCar && nodeOtherCar.ignoreCollider(3);
          var points = contact.getWorldManifold().points;
          console.log("Points: ", points, contact.getWorldManifold().normal, contact.getWorldManifold().separations);
          console.log("pos: ", selfCollider.node.position, otherCollider.node.position);
          points.forEach(function (point) {
            x += point.x;
            y += point.y;
          });
          x /= points.length;
          y /= points.length;
          x = selfCollider.node.position.x;
          console.log("VSC: ", x, y);
          this.sceneGame.showBoom(new Vec2(x, y));
          this.subLife();
        };
        _proto.onEndContact = function onEndContact(selfCollider, otherCollider, contact) {};
        _proto.setParkingLotManager = function setParkingLotManager(parkLotManager) {
          this.parkingLotManager = parkLotManager;
        };
        _proto.getParkingLotManager = function getParkingLotManager() {
          return this.parkingLotManager;
        };
        _proto.setPathManager = function setPathManager(pathManager) {
          this.pathManager = pathManager;
        };
        _proto.getPathManager = function getPathManager() {
          return this.pathManager;
        };
        _proto.setCarManager = function setCarManager(carManager) {
          this.carManager = carManager;
        };
        _proto.getCarManager = function getCarManager() {
          return this.carManager;
        };
        _proto.update = function update(deltaTime) {
          this.gameTime += deltaTime;
          this.gameTick++;
          // if (this.gameTick % 1800 === 0) {
          //     // 30s
          //     this.carManager.genNewWave();
          // }
        };

        _proto.setSceneGame = function setSceneGame(sceneGame) {
          this.sceneGame = sceneGame;
        };
        _proto.incScore = function incScore() {
          this.score++;
          this.sceneGame.setScore(this.score);
        };
        _proto.reset = function reset() {
          this.life = 3;
          this.score = 0;
        };
        return GameManager;
      }());
      GameManager._instance = void 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GateOut.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "9e6cbddZN1NdpDWIm1Cd0EX", "GateOut", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GateOut = exports('GateOut', (_dec = ccclass('GateOut'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GateOut, _Component);
        function GateOut() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = GateOut.prototype;
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        return GateOut;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Car.ts', './CarManager.ts', './GameManager.ts', './GateOut.ts', './ParkingLot.ts', './ParkingLotManager.ts', './Path.ts', './PathManager.ts', './SceneGame.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/ParkingLot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8958c3HUftCVbNXmCsYDd6q", "ParkingLot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ParkingLot = exports('ParkingLot', (_dec = ccclass('ParkingLot'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ParkingLot, _Component);
        function ParkingLot() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = ParkingLot.prototype;
        _proto.onLoad = function onLoad() {};
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        return ParkingLot;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ParkingLotManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ParkingLot.ts', './GameManager.ts', './GateOut.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, resources, instantiate, Vec3, Component, ParkingLot, GameManager, GateOut;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      ParkingLot = module.ParkingLot;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      GateOut = module.GateOut;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "c2f90ToSQdMwbNO1HNmeyTD", "ParkingLotManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ParkingLotManager = exports('ParkingLotManager', (_dec = ccclass('ParkingLotManager'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ParkingLotManager, _Component);
        function ParkingLotManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.prefabParkingLot = null;
          _this.parkingLots = [];
          _this.gateOuts = [];
          return _this;
        }
        var _proto = ParkingLotManager.prototype;
        _proto.onLoad = function onLoad() {
          GameManager.getInstance().setParkingLotManager(this);
          this.loadResources();
          this.gateOuts.push(this.node.getChildByName("NodeGateOut").getComponent(GateOut));
        };
        _proto.loadResources = function loadResources() {
          var _this2 = this;
          resources.load("prefabs/PrefabParkingLot", function (err, data) {
            _this2.prefabParkingLot = data;
            _this2.onFinishLoadResources();
          });
        };
        _proto.getParkingLots = function getParkingLots() {
          return this.parkingLots;
        };
        _proto.getGateOuts = function getGateOuts() {
          return this.gateOuts;
        };
        _proto.initParkingLot = function initParkingLot() {
          for (var i = 0; i < 5; ++i) {
            var nodeParkingLot = instantiate(this.prefabParkingLot);
            this.node.addChild(nodeParkingLot);
            nodeParkingLot.position = new Vec3(200 + i * 120, 220, i);
            this.parkingLots.push(nodeParkingLot.getComponent(ParkingLot));
          }
        };
        _proto.onFinishLoadResources = function onFinishLoadResources() {
          this.initParkingLot();
        };
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        return ParkingLotManager;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Path.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Graphics, Sprite, Input, Vec3, Color, UITransform, Component, GameManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Graphics = module.Graphics;
      Sprite = module.Sprite;
      Input = module.Input;
      Vec3 = module.Vec3;
      Color = module.Color;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "a615d2MLztBULrqEMVRTglw", "Path", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Path = exports('Path', (_dec = ccclass('Path'), _dec2 = property(Graphics), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Path, _Component);
        function Path() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.positions = [];
          _this.sprHead = void 0;
          _initializerDefineProperty(_this, "graphics", _descriptor, _assertThisInitialized(_this));
          _this.parkingLotManager = null;
          _this._isMatchPark = void 0;
          _this._isGettingOut = false;
          _this._isMatchOut = false;
          _this._isDrawing = false;
          return _this;
        }
        var _proto = Path.prototype;
        _proto.onLoad = function onLoad() {
          this.sprHead = this.node.getChildByName("sprHead").getComponent(Sprite);
          this.sprHead.node.on(Input.EventType.TOUCH_START, this.onTouchHeadStart, this);
          this.sprHead.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.sprHead.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          this.sprHead.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
          this.graphics = this.node.getChildByName("nodeGraphics").getComponent(Graphics);
          this.reset();
        };
        _proto.reset = function reset() {
          this.graphics.clear();
          this.sprHead.node.position = new Vec3(0, 0, 0);
          this.sprHead.node.active = false;
          this._isMatchPark = false;
        };
        _proto.getPositions = function getPositions() {
          return this.positions;
        };
        _proto.slicePositions = function slicePositions(moveIndex) {
          this.positions = this.positions.slice(moveIndex);
          this.reDrawPath();
        };
        _proto.reDrawPath = function reDrawPath() {
          if (this.positions.length === 0) {
            return;
          }
          this.graphics.clear();
          this.graphics.moveTo(this.positions[0].x, this.positions[0].y);
          for (var i = 1; i < this.positions.length; ++i) {
            this.graphics.lineTo(this.positions[i].x, this.positions[i].y);
          }
          this.graphics.stroke();
        };
        _proto.onTouchHeadStart = function onTouchHeadStart(event) {
          this._isMatchPark = false;
          this._isMatchOut = false;
          this._isDrawing = true;
        };
        _proto.onTouchStart = function onTouchStart(event) {
          this._isDrawing = true;
          this._isMatchPark = false;
          this._isMatchOut = false;
          this.sprHead.node.active = true;
          var startPos = event.getUILocation();
          this.positions.length = 0;
          this.positions.push(startPos);
          this.graphics.clear();
          this.graphics.strokeColor = Color.WHITE;
          this.graphics.lineWidth = 5;
          this.graphics.moveTo(startPos.x, startPos.y);
        };
        _proto.onTouchMove = function onTouchMove(event) {
          var _this2 = this;
          if (!this._isDrawing) {
            return;
          }
          var minDelta = 5;
          var currentPos = event.getUILocation();
          if (this.positions.length === 0) {
            this.positions.push(currentPos);
            this.sprHead.node.position = currentPos.toVec3();
            this.graphics.moveTo(currentPos.x, currentPos.y); // todo check move or line
          } else {
            var lastPath = this.positions[this.positions.length - 1];
            if (Math.abs(currentPos.x - lastPath.x) > minDelta || Math.abs(currentPos.y - lastPath.y) > minDelta) {
              this.positions.push(currentPos);
              this.sprHead.node.position = currentPos.toVec3();
              this.sprHead.node.active = true;
              this.graphics.lineTo(currentPos.x, currentPos.y);
            }
          }
          var parkingLots = GameManager.getInstance().getParkingLotManager().getParkingLots();
          if (!this._isGettingOut) {
            parkingLots.forEach(function (parkingLot) {
              var rectEntry = parkingLot.node.getChildByName("sprEntry").getComponent(UITransform).getBoundingBoxToWorld();
              if (rectEntry.contains(currentPos)) {
                var centerParkingLot = parkingLot.node.getComponent(UITransform).getBoundingBox().center;
                console.log("Hey hey", centerParkingLot);
                _this2._isMatchPark = true;
                _this2._isDrawing = false;
                _this2.positions.push(centerParkingLot);
                _this2.graphics.lineTo(centerParkingLot.x, centerParkingLot.y);
                _this2.sprHead.node.position = centerParkingLot.toVec3();
              }
            });
          }
          if (this._isGettingOut) {
            var gateOuts = GameManager.getInstance().getParkingLotManager().getGateOuts();
            gateOuts.forEach(function (gate) {
              var rectGate = gate.node.getComponent(UITransform).getBoundingBoxToWorld();
              if (rectGate.contains(currentPos)) {
                _this2._isDrawing = false;
                _this2._isMatchOut = true;
                _this2.positions.push(rectGate.center);
                _this2.graphics.lineTo(rectGate.center.x, rectGate.center.y);
                _this2.sprHead.node.position = rectGate.center.toVec3();
              }
            });
          }
          this.graphics.stroke();
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          if (!this._isDrawing) return;
          console.log("End pos: ", event.getUILocation());
          this.positions.push(event.getUILocation());
          console.log("Current positions: ", this.positions);
        };
        _proto.onTouchCancel = function onTouchCancel(event) {
          if (!this._isDrawing) return;
          console.log("Cancel pos: ", event.getUILocation());
          console.log("Current positions: ", this.positions);
        };
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        _proto.isMatchPark = function isMatchPark() {
          return this._isMatchPark;
        };
        _proto.isMatchOut = function isMatchOut() {
          return this._isMatchOut;
        };
        _proto.isGettingOut = function isGettingOut() {
          return this._isGettingOut;
        };
        _proto.setIsGettingOut = function setIsGettingOut(b) {
          this._isGettingOut = b;
          if (this._isGettingOut) {
            this._isMatchPark = false;
          }
        };
        return Path;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "graphics", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PathManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Path.ts', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, Component, Path, GameManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Path = module.Path;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "2d504Mw5IRANIdGfwqFTIJr", "PathManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PathManager = exports('PathManager', (_dec = ccclass('PathManager'), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PathManager, _Component);
        function PathManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefabPath", _descriptor, _assertThisInitialized(_this));
          _this.pool = [];
          return _this;
        }
        var _proto = PathManager.prototype;
        _proto.onLoad = function onLoad() {
          GameManager.getInstance().setPathManager(this);
          this.pool = [];
        };
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        _proto.getPath = function getPath() {
          var nodePath = instantiate(this.prefabPath);
          this.node.addChild(nodePath);
          return nodePath.getComponent(Path);
        };
        return PathManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabPath", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SceneGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Node, ParticleSystem2D, resources, ParticleAsset, Component, GameManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      ParticleSystem2D = module.ParticleSystem2D;
      resources = module.resources;
      ParticleAsset = module.ParticleAsset;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "fdb0bkEw0BK8qj+5gEg0V0r", "SceneGame", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SceneGame = exports('SceneGame', (_dec = ccclass('SceneGame'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SceneGame, _Component);
        function SceneGame() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.gameManager = void 0;
          _this.lbScoreValue = void 0;
          return _this;
        }
        var _proto = SceneGame.prototype;
        _proto.onLoad = function onLoad() {
          this.gameManager = GameManager.getInstance();
          this.gameManager.setSceneGame(this);
          this.lbScoreValue = this.node.getChildByName("NodeUI").getChildByName("NodeTopLeft").getChildByName("lbScoreValue").getComponent(Label);
        };
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {
          this.gameManager.update(deltaTime);
        };
        _proto.setScore = function setScore(score) {
          this.lbScoreValue.string = score + "";
        };
        _proto.setLife = function setLife(life) {
          var nodeLive = this.node.getChildByName("NodeUI").getChildByName("NodeTopLeft").getChildByName("nodeLive");
          var child = nodeLive.children.forEach(function (node, index) {
            if (index < life) {
              node.active = true;
            } else {
              node.active = false;
            }
          });
        };
        _proto.showBoom = function showBoom(pos) {
          console.log("BOOM: ", pos);
          var node = new Node("effect");
          var particleSystem = node.addComponent(ParticleSystem2D);
          resources.load("particles/boom", ParticleAsset, function (err, particleAsset) {
            if (err) {
              console.error("Failed to load particle asset:", err);
              return;
            }
            particleSystem.file = particleAsset;
            particleSystem.playOnLoad = true; // Optionally, start playing immediately
          });

          particleSystem.autoRemoveOnFinish = true;
          particleSystem.duration = 1;
          var nodeEffect = this.node.getChildByName("NodeEffect");
          nodeEffect.addChild(node);
          node.setPosition(pos.toVec3());
          setTimeout(function () {
            node.removeFromParent();
          }, 1000);

          // const nodeBoom = this.node.getChildByName("NodeEffect").getChildByName("NodeBoom");
          // nodeBoom.setPosition(pos.toVec3());
          // nodeBoom.active = true;
          // setTimeout(() => {
          //     nodeBoom.active = false;
          // },500);
        };

        _proto.showGameOver = function showGameOver(score) {
          var nodeGameOver = this.node.getChildByName("NodeUI").getChildByName("NodeGameOver");
          nodeGameOver.active = true;
          nodeGameOver.getChildByName("lbScore").getComponent(Label).string = score + "";
        };
        return SceneGame;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});